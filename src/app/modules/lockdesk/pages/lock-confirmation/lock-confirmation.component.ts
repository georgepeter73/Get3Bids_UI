import {Component, OnInit, ChangeDetectionStrategy, ViewChild, Inject, LOCALE_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LockDeskService} from '@data/service/lockdesk.service';
import {LoanInfo} from '@data/schema/lockdesk/loan-info';
import {formatDate, Location} from '@angular/common';
import {GlobalService} from '@app/service/global.service';
import {AgGridAngular} from '@ag-grid-community/angular';
import {of} from 'rxjs';
import {TaxonomyService} from '@data/service/taxonomy.service';
import {Taxonomy} from '@data/schema/taxonomy';
import {LockLoan} from '@data/schema/lockdesk/lock-loan';
import {GridOptions} from 'ag-grid-community';
import {faLock,faUnlock,faPrint,faSave,faTrash} from '@fortawesome/free-solid-svg-icons';
import {LockLoanConfirmation} from '@data/schema/lockdesk/lock-loanconfirmation';
import {Adjustment} from '@data/schema/lockdesk/adjustment';
import {LockExtensionmaster} from '@data/schema/lockdesk/lock-extensionmaster';
import {LockLoanextension} from '@data/schema/lockdesk/lock-loanextension';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogModel} from '@data/schema/ConfirmationDialogModal';
import {ConfirmationDialogCompComponent} from '@shared/component/confirmation-dialog-comp/confirmation-dialog-comp.component';
import {AuthService} from '@app/service/auth.service';
import {LockingActions} from '@data/schema/lockdesk/locking-actions';

@Component({
  selector: 'app-lock-confirmation',
  templateUrl: './lock-confirmation.component.html',
  styleUrls: ['./lock-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LockConfirmationComponent implements OnInit {
  private selectedUserMloUUID: string;

  constructor(@Inject(LOCALE_ID) public locale: string,
              private route : ActivatedRoute,
              private lockDeskService : LockDeskService,
              private router: Router,
              private _location: Location,
              private  globalService: GlobalService,
              private taxonomyService: TaxonomyService,
              private dialog: MatDialog,
              private authService: AuthService,
             ) { }
  private loanNumber = "";
  loanInfo : LoanInfo = new LoanInfo();
  initialLockLoanInfo : LoanInfo = new LoanInfo();
  finallockLoanInfo : LoanInfo = new LoanInfo();
  rateLockButtonLoading : false;
  lockLoans =[];
  faprint=faPrint;
  fasave = faSave;
  fatrash = faTrash;
  rowData: any ;
  lockStatusType : Taxonomy;
  lockRequestStatusType : Taxonomy;
  lockRequestStatusTypeForHistory : Taxonomy;
  //initial lock loan is the last active reocrd from lock loan collection
  initialLockLoan : LockLoan = new LockLoan();
  //final lock loan is the current loan data from lendingpad with current reprice data from loanhouse. its always on the fly data that is not stored in collections
  finalLockLoan : LockLoan = new LockLoan();
  lock = faLock;
  unlock = faUnlock;
  mainlockLoanDataLoading = false
  public gridOptions: GridOptions;
  mainDataLoadingSpinner : boolean= false;
  LockStatusType = {
    float: 101,
    locked: 102,
    expired: 103,
  };

  LockStatesType = {
    RequestRateLock: 101,
    AcceptLock: 102,
    Unlock : 104,
    RequestLockExtension : 107,
    AcceptLockExtension :108,
    RequestNewAdjustment :110,
    AcceptNewAdjustment :111
   };
  errorMessage : string;
  lockLoanSuccessful = false;
  lockLoanConfirmationData = new LockLoanConfirmation()
  lockExtensionMaster : LockExtensionmaster[] =[];
  dialogData = new ConfirmationDialogModel('Confirm', 'Are you sure you want to continue?');
  totalLockExtensionDays = 0;
  minDataLoading = false;
  lockingActions : LockingActions[]=[];
  loanLockWorkFlowStatus = "";
   @ViewChild("grid") lockLoanGrid: AgGridAngular;
  columnDefs = [
    {
      headerName: "When",
      field: "lastUpdatedDateStr",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 190,
      cellRenderer: (data) => {
        return data.value ? formatDate(data.value, 'd MMM yyyy hh mm aa', this.locale) : '';
      },
    },
    {
      headerName: "Lock Status",
      valueFormatter: params => this.lockStatus(params.data.lockStatus),
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 100
    },
    {
      headerName: "Work Flow Status",
      sortable: true,
      valueFormatter: params => this.lockRequestStatus(params.data.lockState),
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "Lock Date",
      field: "lockDateStr",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 190,
      cellRenderer: (data) => {
        return data.value ? formatDate(data.value, 'd MMM yyyy', this.locale) : '';
      },
    },

    {
      headerName: "Product",
      field: "selectedProduct.productName",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 250
    },
    {
      headerName: "Note Rate",
      field: "selectedQuote.rate",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 100,
      valueFormatter: params => params.data.selectedQuote.rate.toFixed(2),
    },
    {
      headerName: "Price",
      field: "selectedQuote.price",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 100,
      valueFormatter: params => params.data.selectedQuote.price.toFixed(3),
    },

    {
      headerName: "Who",
      field: "lastUpdatedBy",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 200
    },
  ];
  actionSpinnerLoading=false ;
  lockLoanFailure = false;
  lockState =-1;
  basePrice = 0;
  lockLoanActionSuccessMessage: string;
  lockLoanActionFailureMessage: string;
  finalDataLoading: boolean= false;
  rowClassRules: any;
  lockExtensionActionSpinner: any;
  lockExtensionDays=-1
  minDataLoadingSpinner = false;

  ngOnInit(): void {
    this.minDataLoading = false;
    this.minDataLoadingSpinner = true;
    //primary key in lendingpad collection
    this.loanNumber = this.route.snapshot.paramMap.get('loanNumber');
    this.selectedUserMloUUID = this.route.snapshot.paramMap.get('selectedUserMloUUID');
    //loading all the master data
    this.getTaxonomy();
    this.getLockLoanHistory(this.loanNumber);
    this.loadLockExtensionMaster();
    //loading the minimum data that is needed before you load the maximum data
    this.lockDeskService.getMinLockLoanConfirmationData(this.loanNumber).subscribe(i =>{
      this.loanInfo = i.initialLockLoan.loanInfo;
      this.initialLockLoan = i.initialLockLoan;
      this.finalLockLoan = i.finalLockLoan;
      this.finallockLoanInfo = this.finalLockLoan.loanInfo;
      this.initialLockLoanInfo = this.initialLockLoan.loanInfo;
      this.lockLoanConfirmationData = i;
      this.getLockingActions();
      //if the status is null or does not exist or if there is already a lock request
      //then before lock and after lock will have final loan info
      if(!this.initialLockLoan.lockStatus || this.initialLockLoan.lockStatus === this.LockStatusType.float ){
         this.initialLockLoanInfo = this.finallockLoanInfo;
        this.finallockLoanInfo =  this.finallockLoanInfo;
        this.loanInfo = this.finallockLoanInfo
      }
      this.loanLockWorkFlowStatus = this.getLockStateDesc(this.initialLockLoan.lockState);
      this.minDataLoading = true;
      this.minDataLoadingSpinner = false;
       //loading the maximun initial and final records for display only if the lock loan record is available else dont call
      if( this.initialLockLoan &&  this.initialLockLoan.lockStatus) {
        this.getLockLoanConfirmationData(this.loanNumber, i.initialLockLoan.loanInfo);
      }else{
        this.mainlockLoanDataLoading = true;
        this.mainDataLoadingSpinner = false;
      }
      this.globalService.setRQSelectedLoanInfo(this.loanInfo);
      //hack for data not displaying with out a mouse click
      this.emitEvent();
    },error => {
      this.errorMessage = JSON.stringify(error);
      console.log(this.errorMessage);
      this.emitEvent();
    });

    //highlighting the active record in the lock history
    this.rowClassRules = {
      'dohover': function(params) {
          return params.data.isActive === true; },
    };
  }

  getLockingActions(){
    let role : string;
    let state : number;
    if(this.authService.isMLO()){
      role="mlo";
    }else if(this.authService.isLockDesk()){
      role="lockdesk";
    }
    if(!this.initialLockLoan.lockState){
      state = 100;
     }else{
      state = this.initialLockLoan.lockState;
    }
    const isLockExpired = this.initialLockLoan.lockExpired!=null ? this.initialLockLoan.lockExpired : false ;
    this.lockDeskService.getLockActionsByStateAndRole(state, role,isLockExpired).subscribe(actions =>{
      this.lockingActions = actions;
      })
  }
  loadLockExtensionMaster(){
    this.lockDeskService.getAllLockExtensionMaster().subscribe(m => {
      this.lockExtensionMaster = m;

    })
  }
  getLockLoanHistory(loanNumber: string){
    this.lockDeskService.getLockLoanItemsByLoanNumber(loanNumber).subscribe(items =>{
      items.sort((a, b) => (a.lastUpdatedDateStr > b.lastUpdatedDateStr ? -1 : 1));
      this.rowData = of(items);
      this.emitEvent();
    });
  }
  emitEvent(){
    //hack for data not displaying with out a mouse click
    this.eventFire(document.getElementById('refreshButtonId'), 'click');
  }

  getLockLoanConfirmationData(loanNumber:string,curretnLoanInfo:LoanInfo){
    this.mainDataLoadingSpinner = true;
    this.mainlockLoanDataLoading = false;
      this.lockDeskService.getLockLoanConfirmationData(loanNumber).subscribe(lockConfirmation =>{
      this.initialLockLoan = lockConfirmation.initialLockLoan;
      this.finalLockLoan = lockConfirmation.finalLockLoan;
      this.finallockLoanInfo = this.finalLockLoan.loanInfo;
      this.initialLockLoanInfo = this.initialLockLoan.loanInfo;
      this.lockLoanConfirmationData = lockConfirmation;
      this.mainlockLoanDataLoading = true;
      this.mainDataLoadingSpinner = false;
      this.setLockExtensionDays();
      this.getLockingActions();
      this.loanLockWorkFlowStatus = this.getLockStateDesc(this.initialLockLoan.lockState);

      //if the status is null or does not exist or if there is already a lock request
      //then before lock and after lock will have current loan info
      if(!this.initialLockLoan.lockStatus || this.initialLockLoan.lockStatus === this.LockStatusType.float ){
         this.initialLockLoanInfo = curretnLoanInfo;
         this.finallockLoanInfo = curretnLoanInfo;
       }
        //hack for data not displaying with out a mouse click
       this.emitEvent();
       //to display the Lock Status
       if(this.initialLockLoan &&  this.lockStatusType && this.initialLockLoan.lockStatus) {
         this.initialLockLoan.lockStatusStr = this.lockStatusType.taxonomyItems.filter(t => parseInt(t.key) === this.initialLockLoan.lockStatus).pop().description
       }
    },error => {
         this.errorMessage = JSON.stringify(error);
         console.log(this.errorMessage);
         this.emitEvent();
      })
  }
  setLockExtensionDays(){
    if(this.initialLockLoan.lockExtensionDays) {
      this.initialLockLoan.lockExtensionDays.forEach(le => {
        this.totalLockExtensionDays = this.totalLockExtensionDays + le.numberOfDays;
      })
    }
  }
  lockRequestStatus(cType: string) {
    let lockRequestStatusDesc = '';
     lockRequestStatusDesc = this.lockRequestStatusTypeForHistory.taxonomyItems.filter(t => t.key === cType).pop().description
    return lockRequestStatusDesc;

  }
  lockStatus(cType: string) {
    let lockStatusDesc = '';
    lockStatusDesc = this.lockStatusType.taxonomyItems.filter(t => t.key === cType).pop().description
    return lockStatusDesc;

  }

  getTaxonomy(){
    this.taxonomyService.getAllTaxonomies().subscribe(taxonomies => {
      this.lockStatusType = taxonomies
        .filter(tax => tax.type === 'LockStatus')
        .pop();
      this.lockRequestStatusTypeForHistory = taxonomies
        .filter(tax => tax.type === 'LockRequestStatus')
        .pop();

    });
    this.taxonomyService.getAllTaxonomies().subscribe(taxonomies => {
      this.lockRequestStatusType = taxonomies
        .filter(tax => tax.type === 'LockRequestStatus')
        .pop();
       //if not lock desk then filter it.
      if(!this.globalService.getIsLockDesk()){
        this.lockRequestStatusType.taxonomyItems = this.lockRequestStatusType.taxonomyItems.filter(ti => ti.key == this.LockStatesType.RequestRateLock.toString());
      }

     });
  }
  backClicked($event: MouseEvent) {
    $event.preventDefault();
    if(this.globalService.getLockLoanNavStarter() === 'loan-pipeline') {
      this.router.navigate(["/lockdesk/loan-pipeline"]);
    }
    if(this.globalService.getLockLoanNavStarter() === 'lock-loan-pipeline') {
      this.router.navigate(["/lockdesk/lock-loan-pipeline"]);
    }
  }
  saveRateLockInitialSetUps(){
    this.actionSpinnerLoading = true;
    this.lockLoanFailure = false;
    this.initialLockLoan.selectedUserMloUUID = this.selectedUserMloUUID;
    if(this.lockLoanConfirmationData.customInitialAndFinalAdjustments &&  this.initialLockLoan.productDetail) {
       this.initialLockLoan.productDetail.customAdjustments = this.lockLoanConfirmationData.customInitialAndFinalAdjustments;
    }
  }
  saveLockExtensionConfirmation(lockState : number, extensionDays : number){
      this.openConfirmationDialog().afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.emitEvent();
        this.saveLockExtensionFinal(lockState,extensionDays)
      }else{
        //do nothing.
        //do nothing .
        this.lockLoanSuccessful = false;
        this.actionSpinnerLoading = false;
      }
    });


  }

  saveLockExtensionFinal(lockState : number, extensionDays : number){
    this.saveRateLockInitialSetUps();
    if(lockState === this.LockStatesType.RequestLockExtension){
      this.lockLoanSuccessful = false;
      this.initialLockLoan.lockStatus = this.LockStatusType.locked;
      this.initialLockLoan.lockState = lockState;
      let lockExtensionDays1 = new LockLoanextension();
      lockExtensionDays1.numberOfDays = this.lockExtensionDays;
      if(!this.initialLockLoan.lockExtensionDays){
        this.initialLockLoan.lockExtensionDays = [];
      }
      this.initialLockLoan.lockExtensionDays.push(lockExtensionDays1);
      this.lockLoanActionSuccessMessage = "Extension requested successfully."

    }

    this.savelLockLoanFinal();
  }
  saveRateLockConfirmation(lockState : number){

    if(lockState === this.LockStatesType.RequestRateLock) {
      this.router.navigate(["/lockdesk/rate-quote-product/" + this.loanNumber + "/" + lockState.toString() + '/' + this.selectedUserMloUUID]);
    }else if(lockState === this.LockStatesType.RequestLockExtension){
      //do nothing .
      this.lockLoanSuccessful = false;
      this.actionSpinnerLoading = false;

    }else {
        this.openConfirmationDialog().afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.emitEvent();
          this.saveRateLock(lockState)
        } else {
          //do nothing.
          //do nothing .
          this.lockLoanSuccessful = false;
          this.actionSpinnerLoading = false;
        }
      });
    }
  }
  openConfirmationDialog(){
    return this.dialog.open(ConfirmationDialogCompComponent, {
      maxWidth: '400px',
      closeOnNavigation: true,
      data: this.dialogData
    })
 }

  saveRateLock(lockState : number) {
    this.saveRateLockInitialSetUps();
   if(lockState === this.LockStatesType.RequestRateLock) {
      this.router.navigate(["/lockdesk/rate-quote-product/" + this.loanNumber + "/" + lockState.toString() + '/' + this.selectedUserMloUUID]);
    }else if(lockState === this.LockStatesType.RequestLockExtension ){
      //do nothing .
      this.lockLoanSuccessful = false;
      this.actionSpinnerLoading = false;

    }else{
      if(lockState === this.LockStatesType.AcceptLock){
        this.lockLoanSuccessful = false;
        this.initialLockLoan.lockStatus = this.LockStatusType.locked;
        this.initialLockLoan.lockState = this.LockStatesType.AcceptLock;
        this.lockLoanActionSuccessMessage = "Loan locked successfully."

      }

      if(lockState === this.LockStatesType.Unlock){
        this.lockLoanSuccessful = false;
        this.initialLockLoan.lockStatus = this.LockStatusType.float;
        this.initialLockLoan.lockState = this.LockStatesType.Unlock;
        this.initialLockLoan.lockExtensionDays=[];
        this.initialLockLoan.productDetail.customAdjustments=[];
        this.lockLoanActionSuccessMessage = "Un-lock successful."

      }
     if(lockState === this.LockStatesType.AcceptNewAdjustment){
       this.lockLoanSuccessful = false;
       this.initialLockLoan.lockState = this.LockStatesType.AcceptNewAdjustment;
       this.lockLoanActionSuccessMessage = "Adjustment accepted successfully."

     }
     if(lockState === this.LockStatesType.RequestNewAdjustment){
       this.lockLoanSuccessful = false;
       this.initialLockLoan.lockState = this.LockStatesType.RequestNewAdjustment;
       this.lockLoanActionSuccessMessage = "Adjustment requested successfully."

     }
     if(lockState === this.LockStatesType.AcceptLockExtension){
       this.lockLoanSuccessful = false;
       this.initialLockLoan.lockState = this.LockStatesType.AcceptLockExtension;
       this.lockLoanActionSuccessMessage = "Lock Extension accepted successfully."

     }
      this.savelLockLoanFinal()
    }


  }

  savelLockLoanFinal(){
    this.initialLockLoan.loanNumber = this.loanNumber;
    //common code
    this.lockDeskService.saveLockLoan(this.initialLockLoan).subscribe(ll =>{
      this.initialLockLoan = ll;
      this.lockLoanSuccessful = true;
      this.actionSpinnerLoading = false;
      this.getLockLoanHistory(this.initialLockLoan.loanNumber);
      this.getLockLoanConfirmationData(this.loanInfo.loanNumber,this.loanInfo);
      this.lockState=0;
      this.emitEvent();
    },error => {
      this.actionSpinnerLoading = false;
      this.lockLoanSuccessful = false;
      this.mainDataLoadingSpinner=false;
      this.lockLoanFailure=true;
       this.errorMessage = JSON.stringify(error);
      this.lockLoanActionFailureMessage = "Locking action Failed. An email has been sent to admin."
      this.emitEvent();
    })
  }



  eventFire(el, etype){
    if(el) {
      if (el.fireEvent) {
        el.fireEvent('on' + etype);
      } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
      }
    }
  }
  refreshGrid($event: MouseEvent) {
    $event.preventDefault();
    if(this.lockLoanGrid) {
      this.lockLoanGrid.api.sizeColumnsToFit();
    }
  }

  addCustomAdjustments() {
    let adjustment = new Adjustment();
    adjustment.initialAdjustor = "";
    adjustment.finalAdjustor = "";
    adjustment.reason = ""
    this.lockLoanConfirmationData.customInitialAndFinalAdjustments.push(adjustment);

  }
  deleteAdjustment(i: number) {

    if(this.lockLoanConfirmationData.customInitialAndFinalAdjustments[i].initialAdjustor.trim().length>0) {
       this.lockLoanConfirmationData.customInitialAndFinalAdjustments.splice(i, 1);
      this.saveRateLock(this.LockStatesType.RequestNewAdjustment);
    }else{
      this.lockLoanConfirmationData.customInitialAndFinalAdjustments.splice(i, 1);
    }
  }

  print() {
    if(this.initialLockLoan.loanInfo) {
      document.title = this.initialLockLoan.loanInfo.loanNumber
        + "_" + this.initialLockLoan.loanInfo.borrower.firstName + " "
        + this.initialLockLoan.loanInfo.borrower.lastName;
    }
    window.print();
  }

  saveCustomAdjustments(i: number) {
    this.saveRateLock(this.LockStatesType.RequestNewAdjustment);
  }
  getLockStateDesc(state : number){
    let ret = "";
    if(state && this.lockRequestStatusTypeForHistory &&  this.lockRequestStatusTypeForHistory.taxonomyItems) {
        ret = this.lockRequestStatusTypeForHistory.taxonomyItems.filter(l => l.key == state.toString()).pop().description;
     }
    return ret;
  }
}
