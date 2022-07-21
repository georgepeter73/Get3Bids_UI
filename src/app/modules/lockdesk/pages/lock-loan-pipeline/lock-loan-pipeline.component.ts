import {Component, OnInit, ChangeDetectionStrategy, ViewChild, Inject, LOCALE_ID} from '@angular/core';
import {AgGridAngular} from '@ag-grid-community/angular';
import {formatDate, Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {LockDeskService} from '@data/service/lockdesk.service';
import {TaxonomyService} from '@data/service/taxonomy.service';
import {of} from 'rxjs';
import {Taxonomy} from '@data/schema/taxonomy';
import {GlobalService} from '@app/service/global.service';
import {faLock, faUnlock} from '@fortawesome/free-solid-svg-icons';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-lock-loan-pipeline',
  templateUrl: './lock-loan-pipeline.component.html',
  styleUrls: ['./lock-loan-pipeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LockLoanPipelineComponent implements OnInit {
  rowData: any ;
  lockStatusType : Taxonomy;
  lockRequestStatusType : Taxonomy;
  lock = faLock;
  unlock = faUnlock;
  faUserEdit=faUserEdit
  constructor(@Inject(LOCALE_ID) public locale: string,
              private route : ActivatedRoute,
              private lockDeskService : LockDeskService,
              private router: Router,
              private _location: Location,
              private taxonomyService: TaxonomyService,
              public globalService: GlobalService,
  ) { }
  @ViewChild("grid") lockLoanGrid: AgGridAngular;
  columnDefs = [
    {
      headerName: "Lock Number",
      field: "loanNumber",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 120
    },
    {
      headerName: "Borrower First Name",
      field: "loanInfo.borrower.firstName",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "Borrower Last Name",
      field: "loanInfo.borrower.lastName",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "Loan Officer",
      field: "loanInfo.loanOfficer.name",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
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
         return data.value ? formatDate(data.value, 'dd MMM yyyy', this.locale) : '';
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
      valueFormatter: params => params.data.selectedQuote.rate.toFixed(3),
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
  ];
  lockLoanFailure: boolean;
  searchValue: any;

  ngOnInit(): void {
    this.getTaxonomy();
    this.getLockLoanHistory();
  }
  getLockLoanHistory(){
    this.getTaxonomy();
    setTimeout(() =>
      {
        this.lockDeskService.geAllActiveLockLoans().subscribe(items =>{
          items.sort((a, b) => (a.lastUpdatedDate > b.lastUpdatedDate ? -1 : 1));

          this.rowData = of(items);
          this.emitEvent();
        },error => {
          this.lockLoanFailure = true;
        });
      },
      1000);

  }
  emitEvent(){
    //hack for data not displaying with out a mouse click
    this.eventFire(document.getElementById('refreshButtonId'), 'click');
  }
  refreshGrid($event: MouseEvent) {
    $event.preventDefault();
    if(this.lockLoanGrid) {
      this.lockLoanGrid.api.sizeColumnsToFit();
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
  lockRequestStatus(cType: string) {
    let lockRequestStatusDesc = '';
    if( this.lockRequestStatusType && this.lockRequestStatusType.taxonomyItems) {
       lockRequestStatusDesc = this.lockRequestStatusType.taxonomyItems.filter(t => t.key === cType).pop().description
    }
    return lockRequestStatusDesc;

  }
  lockStatus(cType: string) {
    let lockStatusDesc = '';
    if(this.lockStatusType && this.lockStatusType.taxonomyItems) {
        lockStatusDesc = this.lockStatusType.taxonomyItems.filter(t => t.key === cType).pop().description
     }
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
  onRowClick($event: any) {
    this.globalService.setLockLoanNavStarter("lock-loan-pipeline");
     this.router.navigate(['/lockdesk/lock-confirmation/' + $event.data.loanNumber + '/' + $event.data.selectedUserMloUUID]);
  }


  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this.router.navigate(['/lockdesk/lockdeskhome'])
  }



}
