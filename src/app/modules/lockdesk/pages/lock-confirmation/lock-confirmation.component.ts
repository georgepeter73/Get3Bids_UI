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
import {AuthService} from '@app/service/auth.service';


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
              private authService: AuthService,) { }
  private itemId = "";
  loanInfo : LoanInfo = new LoanInfo();
  initialLock : LoanInfo = new LoanInfo();
  finallock : LoanInfo = new LoanInfo();
  rateLockButtonLoading : false;
  lockLoans =[];
  rowData: any ;
  lockStatusType : Taxonomy;
  lockRequestStatusType : Taxonomy;
  //initial lock loan is the last active reocrd from lock loan collection
  initialLockLoan : LockLoan = new LockLoan();
  //final lock loan is the current loan data from lendingpad with current reprice data from loanhouse. its always on the fly data that is not stored in collections
  finalLockLoan : LockLoan = new LockLoan();
  lock = faLock;
  unlock = faUnlock;
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
    ExtendLock : 105
  };
  lockLoanSuccessful = false;
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
      minWidth: 100
    },
    {
      headerName: "Price",
      field: "selectedQuote.price",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 100
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

  ngOnInit(): void {
    this.mainDataLoading = true;
    this.itemId = this.route.snapshot.paramMap.get('itemId');
    this.selectedUserMloUUID = this.route.snapshot.paramMap.get('selectedUserMloUUID');
    this.lockDeskService.getLoanById(this.itemId).subscribe(i =>{
      this.loanInfo = i;
      this.getInitialLockLoan(i.loanNumber,i);
      this.globalService.setRQSelectedLoanInfo(this.loanInfo);
      this.getLockLoanHistory(i.loanNumber);
    });
    this.getTaxonomy();
    //highlighting the active record in the lock history
    this.rowClassRules = {
      'dohover': function(params) {
          return params.data.isActive === true; },
    };
  }
  getLockLoanHistory(loanNumber: string){
    this.lockDeskService.getLockLoanItemsByLoanNumber(loanNumber).subscribe(items =>{
      items.sort((a, b) => (a.lastUpdatedDate > b.lastUpdatedDate ? -1 : 1));
      this.rowData = of(items);
      this.mainDataLoading = false;
       this.emitEvent();
    });
  }
  emitEvent(){
    //hack for data not displaying with out a mouse click
    this.eventFire(document.getElementById('refreshButtonId'), 'click');
  }

  disableActionItem(taxonomyItemKey :string){

    if(this.initialLockLoan.lockState == this.LockStatesType.RequestRateLock){
      if(parseInt(taxonomyItemKey) == this.LockStatesType.RequestRateLock){
        return true;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.AcceptLock){
        return false;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.Unlock){
        return true;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.ExtendLock){
        return true;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.RejectLockRequest){
        return false;
      }

    }

    if(this.initialLockLoan.lockState == this.LockStatesType.AcceptLock){
      if(parseInt(taxonomyItemKey) == this.LockStatesType.RequestRateLock){
        return true;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.AcceptLock){
        return true;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.Unlock){
        return false;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.ExtendLock){
        return false;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.RejectLockRequest){
        return true;
      }

    }
    if(this.initialLockLoan.lockState == this.LockStatesType.RejectLockRequest){
      if(parseInt(taxonomyItemKey) == this.LockStatesType.RequestRateLock){
        return false;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.AcceptLock){
        return true;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.Unlock){
        return true;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.ExtendLock){
        return true;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.RejectLockRequest){
        return true;
      }

    }
    if(this.initialLockLoan.lockState == this.LockStatesType.ExtendLock){
      if(parseInt(taxonomyItemKey) == this.LockStatesType.RequestRateLock){
        return true;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.AcceptLock){
        return true;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.Unlock){
        return false;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.ExtendLock){
        return false;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.RejectLockRequest){
        return true;
      }

    }
    if(this.initialLockLoan.lockState == this.LockStatesType.Unlock){
      if(parseInt(taxonomyItemKey) == this.LockStatesType.RequestRateLock){
        return false;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.AcceptLock){
        return true;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.Unlock){
        return true;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.ExtendLock){
        return true;
      }
      if(parseInt(taxonomyItemKey) == this.LockStatesType.RejectLockRequest){
        return true;
      }

    }
    return false;
  }

  getBasePrice(){
    if(this.initialLockLoan && this.initialLockLoan.productDetail && this.initialLockLoan.productDetail.adjustments){
      this.basePrice =  this.initialLockLoan.selectedQuote.price;
      this.initialLockLoan.productDetail.adjustments.forEach(ad => {
         if(ad.adjustor) {
            this.basePrice = parseFloat(ad.adjustor) + this.basePrice;
        }

      })
      }
  }

  getInitialLockLoan(loanNumber:string,curretnLoanInfo:LoanInfo){
      this.lockDeskService.getInitialLockLoan(loanNumber).subscribe(activeLoan =>{
      this.initialLockLoan = activeLoan;
       this.mainDataLoading = false;
        //if the loan is locked then before lock will have the loan info that is stored while the loan is locked
       //after lock will the current loan info.

       if(this.initialLockLoan.lockStatus === this.LockStatusType.locked){
         this.initialLock = this.initialLockLoan.loanInfo;
         this.finalDataLoading = true;
         //this is on the fly data which is current from lendingpad and loanhouse PPE engine
         this.lockDeskService.getFinalLockLoan(loanNumber).subscribe(finalLL =>{
           this.finalLockLoan = finalLL;
           this.finallock = finalLL.loanInfo;
           this.finalDataLoading = false;
         })
       }
       //if the status is null or does not exist or if there is already a lock reqeuest
       //then before lock and after lock will have current loan info
       if(!this.initialLockLoan.lockStatus || this.initialLockLoan.lockStatus === this.LockStatusType.float ){
         this.initialLock = curretnLoanInfo;
         this.finallock = curretnLoanInfo;
       }
       this.getBasePrice();
       //hack for data not displaying with out a mouse click
       this.eventFire(document.getElementById('refreshButtonId'), 'click');
        this.initialLockLoan.lockStatusStr = this.lockStatusType.taxonomyItems.filter(t => parseInt(t.key) === this.initialLockLoan.lockStatus).pop().description
    })
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
  }


  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this.router.navigate(["/lockdesk/loan-pipeline"]);
  }

  saveRateLock(lockState : number) {
    this.actionSpinnerLoading = true;
    this.lockLoanFailure = false;
    if(lockState === this.LockStatesType.RequestRateLock) {
      this.router.navigate(["/lockdesk/rate-quote-product/" + this.itemId + "/" + lockState.toString() + '/' + this.selectedUserMloUUID]);
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
      if(lockState === this.LockStatesType.ExtendLock){
        this.lockLoanSuccessful = false;
        this.initialLockLoan.lockStatus = this.LockStatusType.locked;
        this.initialLockLoan.lockState = this.LockStatesType.ExtendLock;
        this.lockLoanActionSuccessMessage = "Extension Successful."

      }
      this.initialLockLoan.itemId = this.itemId;
      //common code
      this.lockDeskService.saveLockLoan(this.initialLockLoan).subscribe(ll =>{
        this.initialLockLoan = ll;
        this.lockLoanSuccessful = true;
        this.actionSpinnerLoading = false;
        this.getLockLoanHistory(this.initialLockLoan.loanNumber);
        this.getInitialLockLoan(this.loanInfo.loanNumber,this.loanInfo);
        this.lockState=0;
        this.emitEvent();
      })
    }


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
    this.lockLoanGrid.api.sizeColumnsToFit();
  }
}
