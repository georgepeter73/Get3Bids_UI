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

  constructor(@Inject(LOCALE_ID) public locale: string,private route : ActivatedRoute,private lockDeskService : LockDeskService, private router: Router,
              private _location: Location,private  globalService: GlobalService,private taxonomyService: TaxonomyService,private authService: AuthService,) { }
  private itemId = "";
  loanInfo : LoanInfo = new LoanInfo();
  beforeLock : LoanInfo = new LoanInfo();
  afterLock : LoanInfo = new LoanInfo();
  rateLockButtonLoading : false;
  lockLoans =[];
  rowData: any ;
  lockStatusType : Taxonomy;
  lockRequestStatusType : Taxonomy;
  activeLockLoan : LockLoan = new LockLoan();
  lock = faLock;
  unlock = faUnlock;
  public gridOptions: GridOptions;
  mainDataLoading : boolean= false;
  LockStatusType = {
    float: 101,
    locked: 102,
  };
   @ViewChild("grid") lockLoanGrid: AgGridAngular;
  columnDefs = [
    {
      headerName: "Lock Status",
      valueFormatter: params => this.lockStatus(params.data.lockStatus),
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "Work Flow Status",
      sortable: true,
      valueFormatter: params => this.lockRequestStatus(params.data.lockRequestStatus),
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
      minWidth: 150
    },

    {
      headerName: "Product",
      field: "selectedProduct.productName",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "Note Rate",
      field: "selectedQuote.rate",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "Price",
      field: "selectedQuote.price",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "When",
      field: "lastUpdatedDate",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150,
      cellRenderer: (data) => {
        return data.value ? formatDate(data.value, 'd MMM yyyy hh mm aa', this.locale) : '';
      },
    },
    {
      headerName: "Who",
      field: "lastUpdatedBy",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },


  ];



  ngOnInit(): void {
    this.mainDataLoading = true;
    this.itemId = this.route.snapshot.paramMap.get('itemId');
    this.lockDeskService.getLoanById(this.itemId).subscribe(i =>{
      this.loanInfo = i;
      this.getActiveLockLoan(i.loanNumber,i);
      this.globalService.setRQSelectedLoanInfo(this.loanInfo);
      this.lockDeskService.getLockLoanItemsByLoanNumber(i.loanNumber).subscribe(items =>{
           this.rowData = of(items);
        this.mainDataLoading = false;
          //hack for data not displaying with out a mouse click
          this.eventFire(document.getElementById('refreshButtonId'), 'click');

       });

    });
    this.getTaxonomy();
    //based on the logged in users groups set the group
    if(this.authService.getGroups().filter(g => g === 'lockdesk')){
        this.globalService.setIsLockDesk(true);
    }


  }

  getActiveLockLoan(loanNumber:string,curretnLoanInfo:LoanInfo){

     this.lockDeskService.getActiveLockLoan(loanNumber).subscribe(activeLoan =>{
      this.activeLockLoan = activeLoan;
       this.mainDataLoading = false;
       //if the loan is locked then before lock will have the loan info that is stored while the loan is locked
       //after lock will the current loan info.
       if(this.activeLockLoan.lockStatus === this.LockStatusType.locked){
         this.beforeLock = this.activeLockLoan.loanInfo;
         this.afterLock = this.loanInfo;
       }
       //if the status is null or does not exist or if there is already a lock reqeuest
       //then before lock and after lock will have current loan info
       if(!this.activeLockLoan.lockStatus || this.activeLockLoan.lockStatus === this.LockStatusType.float ){
         this.beforeLock = curretnLoanInfo;
         this.afterLock = curretnLoanInfo;
       }
       //hack for data not displaying with out a mouse click
       this.eventFire(document.getElementById('refreshButtonId'), 'click');
        this.activeLockLoan.lockStatusStr = this.lockStatusType.taxonomyItems.filter(t => parseInt(t.key) === this.activeLockLoan.lockStatus).pop().description
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

  requestRateLock(requestType : string) {
    this.router.navigate(["/lockdesk/rate-quote-product/"+this.itemId+ "/" + requestType]);


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
