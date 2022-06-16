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
import {faLock, faUnlock} from '@fortawesome/free-solid-svg-icons';
import {LockLoanConfirmation} from '@data/schema/lockdesk/lock-loanconfirmation';
import {Adjustment} from '@data/schema/lockdesk/adjustment';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {LockExtensionmaster} from '@data/schema/lockdesk/lock-extensionmaster';
import {LockLoanextension} from '@data/schema/lockdesk/lock-loanextension';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogModel} from '@data/schema/ConfirmationDialogModal';
import {ConfirmationDialogCompComponent} from '@shared/component/confirmation-dialog-comp/confirmation-dialog-comp.component';



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
              private dialog: MatDialog
             ) { }
  private itemId = "";
  loanInfo : LoanInfo = new LoanInfo();
  initialLockLoanInfo : LoanInfo = new LoanInfo();
  finallockLoanInfo : LoanInfo = new LoanInfo();
  rateLockButtonLoading : false;
  lockLoans =[];
  fatrash = faTrash
  rowData: any ;
  lockStatusType : Taxonomy;
  lockRequestStatusType : Taxonomy;
  //initial lock loan is the last active reocrd from lock loan collection
  initialLockLoan : LockLoan = new LockLoan();
  //final lock loan is the current loan data from lendingpad with current reprice data from loanhouse. its always on the fly data that is not stored in collections
  finalLockLoan : LockLoan = new LockLoan();
  lock = faLock;
  unlock = faUnlock;
  lockLoanDataLoading = false
  public gridOptions: GridOptions;
  mainDataLoading : boolean= false;
  LockStatusType = {
    float: 101,
    locked: 102,
  };
  LockStatesType = {
    RequestRateLock: 101,
    AcceptLock: 102,
    RejectLockRequest: 103,
    Unlock : 104,
    ExtendLock5 : 105,
   };
  errorMessage : string;
  lockLoanSuccessful = false;
  lockLoanConfirmationData = new LockLoanConfirmation()
  lockExtensionMaster : LockExtensionmaster[] =[];
  dialogData = new ConfirmationDialogModel('Confirm', 'Are you sure you want to continue?');
  totalLockExtensionDays = 0;
   @ViewChild("grid") lockLoanGrid: AgGridAngular;
  columnDefs = [
    {
      headerName: "When",
      field: "lastUpdatedDate",
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
      field: "lockDate",
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
  finalDataLoading: boolean= false;
  rowClassRules: any;
  lockExtensionActionSpinner: any;
  lockExtensionDays=-1

  ngOnInit(): void {

    this.mainDataLoading = true;
    //primary key in lendingpad collection
    this.itemId = this.route.snapshot.paramMap.get('itemId');
    this.selectedUserMloUUID = this.route.snapshot.paramMap.get('selectedUserMloUUID');
    //loading from lendingpad using the primary key
    this.lockDeskService.getLoanById(this.itemId).subscribe(i =>{
      this.loanInfo = i;
      //loading the latest active record for lock loan collection
      this.getLockLoanConfirmationData(i.loanNumber,i);
      this.globalService.setRQSelectedLoanInfo(this.loanInfo);
      this.getLockLoanHistory(i.loanNumber);
      //hack for data not displaying with out a mouse click
      this.emitEvent();
    },error => {
      this.errorMessage = JSON.stringify(error);
      this.emitEvent();
    });
    this.getTaxonomy();
    this.loadLockExtensionMaster();
    //highlighting the active record in the lock history
    this.rowClassRules = {
      'dohover': function(params) {
          return params.data.isActive === true; },
    };
  }
  loadLockExtensionMaster(){
    this.lockDeskService.getAllLockExtensionMaster().subscribe(m => {
      this.lockExtensionMaster = m;

    })
  }
  getLockLoanHistory(loanNumber: string){
    this.lockDeskService.getLockLoanItemsByLoanNumber(loanNumber).subscribe(items =>{
      items.sort((a, b) => (a.lastUpdatedDate > b.lastUpdatedDate ? -1 : 1));
      this.rowData = of(items);
      this.emitEvent();
    });
  }
  emitEvent(){
    //hack for data not displaying with out a mouse click
    this.eventFire(document.getElementById('refreshButtonId'), 'click');
  }

  initialStateRule(taxonomyItemKey :string){
    if(parseInt(taxonomyItemKey) == this.LockStatesType.RequestRateLock){
      return false;
    }
    if(parseInt(taxonomyItemKey) == this.LockStatesType.AcceptLock){
      return true;
    }
    if(parseInt(taxonomyItemKey) == this.LockStatesType.Unlock){
      return true;
    }

    if(parseInt(taxonomyItemKey) == this.LockStatesType.RejectLockRequest){
      return true;
    }
    if (parseInt(taxonomyItemKey) == this.LockStatesType.ExtendLock5) {
      return true;
    }

  }
  requestRateLockRule(taxonomyItemKey :string){
    if(parseInt(taxonomyItemKey) == this.LockStatesType.RequestRateLock){
      return true;
    }
    if(parseInt(taxonomyItemKey) == this.LockStatesType.AcceptLock){
      return false;
    }
    if(parseInt(taxonomyItemKey) == this.LockStatesType.Unlock){
      return true;
    }

    if(parseInt(taxonomyItemKey) == this.LockStatesType.RejectLockRequest){
      return false;
    }
    if (parseInt(taxonomyItemKey) == this.LockStatesType.ExtendLock5) {
      return true;
    }

  }
  acceptRateLockRule(taxonomyItemKey :string){
    if(parseInt(taxonomyItemKey) == this.LockStatesType.RequestRateLock){
      return true;
    }
    if(parseInt(taxonomyItemKey) == this.LockStatesType.AcceptLock){
      return true;
    }
    if(parseInt(taxonomyItemKey) == this.LockStatesType.Unlock){
      return false;
    }

    if(parseInt(taxonomyItemKey) == this.LockStatesType.RejectLockRequest){
      return true;
    }
    if (parseInt(taxonomyItemKey) == this.LockStatesType.ExtendLock5) {
      return false;
    }

  }
  rejectLockRequestRule(taxonomyItemKey :string){
    if(parseInt(taxonomyItemKey) == this.LockStatesType.RequestRateLock){
      return false;
    }
    if(parseInt(taxonomyItemKey) == this.LockStatesType.AcceptLock){
      return true;
    }
    if(parseInt(taxonomyItemKey) == this.LockStatesType.Unlock){
      return true;
    }

    if(parseInt(taxonomyItemKey) == this.LockStatesType.RejectLockRequest){
      return true;
    }
    if (parseInt(taxonomyItemKey) == this.LockStatesType.ExtendLock5) {
      return true;
    }

  }

  unlockRule(taxonomyItemKey: string){
    if(parseInt(taxonomyItemKey) == this.LockStatesType.RequestRateLock){
      return false;
    }
    if(parseInt(taxonomyItemKey) == this.LockStatesType.AcceptLock){
      return true;
    }
    if(parseInt(taxonomyItemKey) == this.LockStatesType.Unlock){
      return true;
    }

    if(parseInt(taxonomyItemKey) == this.LockStatesType.RejectLockRequest){
      return true;
    }
    if (parseInt(taxonomyItemKey) == this.LockStatesType.ExtendLock5) {
      return true;
    }


  }
  extensionRule(taxonomyItemKey: string){
    if(parseInt(taxonomyItemKey) == this.LockStatesType.RequestRateLock){
      return true;
    }
    if(parseInt(taxonomyItemKey) == this.LockStatesType.AcceptLock){
      return true;
    }
    if(parseInt(taxonomyItemKey) == this.LockStatesType.Unlock){
      return false;
    }

    if(parseInt(taxonomyItemKey) == this.LockStatesType.RejectLockRequest){
      return true;
    }
    if (parseInt(taxonomyItemKey) == this.LockStatesType.ExtendLock5) {
      return false;
    }

  }


  disableActionItem(taxonomyItemKey :string){
    if(this.initialLockLoan == null || !this.initialLockLoan.lockState){
      return this.initialStateRule(taxonomyItemKey);
    }
    if(this.initialLockLoan.lockState == this.LockStatesType.RequestRateLock){

        return this.requestRateLockRule(taxonomyItemKey);
    }
    if(this.initialLockLoan.lockState == this.LockStatesType.AcceptLock){

       return this.acceptRateLockRule(taxonomyItemKey);
    }
    if(this.initialLockLoan.lockState == this.LockStatesType.RejectLockRequest){

      return this.rejectLockRequestRule(taxonomyItemKey);
    }

    if(this.initialLockLoan.lockState == this.LockStatesType.Unlock){
     return this.unlockRule(taxonomyItemKey);
    }
    if(this.initialLockLoan.lockState == this.LockStatesType.ExtendLock5 ){
      return this.extensionRule(taxonomyItemKey);
    }

    return false;
  }
  getLockLoanConfirmationData(loanNumber:string,curretnLoanInfo:LoanInfo){
    this.mainDataLoading = true;
    this.lockLoanDataLoading = false;
      this.lockDeskService.getLockLoanConfirmationData(loanNumber).subscribe(lockConfirmation =>{
      this.initialLockLoan = lockConfirmation.initialLockLoan;
      this.finalLockLoan = lockConfirmation.finalLockLoan;
      this.finallockLoanInfo = this.finalLockLoan.loanInfo;
      this.initialLockLoanInfo = this.initialLockLoan.loanInfo;
      this.lockLoanConfirmationData = lockConfirmation;
      this.lockLoanDataLoading = true;
      this.mainDataLoading = false;
      this.setLockExtensionDays();
      //if the status is null or does not exist or if there is already a lock reqeuest
      //then before lock and after lock will have current loan info
      if(!this.initialLockLoan.lockStatus || this.initialLockLoan.lockStatus === this.LockStatusType.float ){
         this.initialLockLoanInfo = curretnLoanInfo;
         this.finallockLoanInfo = curretnLoanInfo;

       }
        //hack for data not displaying with out a mouse click
       this.emitEvent();
       if(this.initialLockLoan &&  this.lockStatusType && this.initialLockLoan.lockStatus) {
         this.initialLockLoan.lockStatusStr = this.lockStatusType.taxonomyItems.filter(t => parseInt(t.key) === this.initialLockLoan.lockStatus).pop().description
       }
    },error => {
         this.errorMessage = JSON.stringify(error);
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
     lockRequestStatusDesc = this.lockRequestStatusType.taxonomyItems.filter(t => t.key === cType).pop().description
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

    });
    this.taxonomyService.getAllTaxonomies().subscribe(taxonomies => {
      this.lockRequestStatusType = taxonomies
        .filter(tax => tax.type === 'LockRequestStatus')
        .pop();
     });
    //if not lock desk then filter it.
    if(!this.globalService.getIsLockDesk()){
      this.lockRequestStatusType.taxonomyItems = this.lockRequestStatusType.taxonomyItems.filter(ti => ti.key === this.LockStatesType.RequestRateLock.toString())
    }
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
    if(this.lockLoanConfirmationData.customInitialAndFinalAdjustments) {
      this.initialLockLoan.productDetail.customAdjustments = this.lockLoanConfirmationData.customInitialAndFinalAdjustments;
    }
  }
  saveLockExtensionConfirmation(lockState : number, extensionDays : number){
      this.openConfirmationDialog().afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
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
    if(lockState === this.LockStatesType.ExtendLock5 ){
      this.lockLoanSuccessful = false;
      this.initialLockLoan.lockStatus = this.LockStatusType.locked;
      this.initialLockLoan.lockState = lockState;
      let lockExtensionDays1 = new LockLoanextension();
      lockExtensionDays1.numberOfDays = this.lockExtensionDays;
      if(!this.initialLockLoan.lockExtensionDays){
        this.initialLockLoan.lockExtensionDays = [];
      }
      this.initialLockLoan.lockExtensionDays.push(lockExtensionDays1);
      this.lockLoanActionSuccessMessage = "Extension Successful."

    }
    this.savelLockLoanFinal();
  }
  saveRateLockConfirmation(lockState : number){

    if(lockState === this.LockStatesType.RequestRateLock) {
      this.router.navigate(["/lockdesk/rate-quote-product/" + this.itemId + "/" + lockState.toString() + '/' + this.selectedUserMloUUID]);
    }else if(lockState === this.LockStatesType.ExtendLock5){
      //do nothing .
      this.lockLoanSuccessful = false;
      this.actionSpinnerLoading = false;

    }else {
        this.openConfirmationDialog().afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
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
    const dialogRef = this.dialog.open(ConfirmationDialogCompComponent, {
      maxWidth: '400px',
      closeOnNavigation: true,
      data: this.dialogData
    })
    return dialogRef;
  }

  saveRateLock(lockState : number) {
    this.saveRateLockInitialSetUps();
   if(lockState === this.LockStatesType.RequestRateLock) {
      this.router.navigate(["/lockdesk/rate-quote-product/" + this.itemId + "/" + lockState.toString() + '/' + this.selectedUserMloUUID]);
    }else if(lockState === this.LockStatesType.ExtendLock5){
      //do nothing .
      this.lockLoanSuccessful = false;
      this.actionSpinnerLoading = false;

    }else{
      if(lockState === this.LockStatesType.AcceptLock){
        this.lockLoanSuccessful = false;
        this.initialLockLoan.lockStatus = this.LockStatusType.locked;
        this.initialLockLoan.lockState = this.LockStatesType.AcceptLock;
        this.lockLoanActionSuccessMessage = "Loan Locked Successfully."

      }
      if(lockState === this.LockStatesType.RejectLockRequest){
        this.lockLoanSuccessful = false;
        this.initialLockLoan.lockStatus = this.LockStatusType.float;
        this.initialLockLoan.lockState = this.LockStatesType.RejectLockRequest;
        this.lockLoanActionSuccessMessage = "Lock Request Rejected."

      }
      if(lockState === this.LockStatesType.Unlock){
        this.lockLoanSuccessful = false;
        this.initialLockLoan.lockStatus = this.LockStatusType.float;
        this.initialLockLoan.lockState = this.LockStatesType.Unlock;
        this.lockLoanActionSuccessMessage = "Un-lock Successful."

      }
      this.savelLockLoanFinal()
    }


  }

  savelLockLoanFinal(){
    this.initialLockLoan.itemId = this.itemId;
    //common code
    this.lockDeskService.saveLockLoan(this.initialLockLoan).subscribe(ll =>{
      this.initialLockLoan = ll;
      this.lockLoanSuccessful = true;
      this.actionSpinnerLoading = false;
      this.getLockLoanHistory(this.initialLockLoan.loanNumber);
      this.getLockLoanConfirmationData(this.loanInfo.loanNumber,this.loanInfo);
      this.lockState=0;
      this.emitEvent();
    })
  }



  eventFire(el, etype){
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
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
    this.lockLoanConfirmationData.customInitialAndFinalAdjustments.splice(i, 1);
  }
}
