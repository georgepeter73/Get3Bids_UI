import {Component, OnInit, ChangeDetectionStrategy, ViewChild, Inject, LOCALE_ID} from '@angular/core';
import {AgGridAngular} from '@ag-grid-community/angular';
import {formatDate, Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {LockDeskService} from '@data/service/lockdesk.service';
import {TaxonomyService} from '@data/service/taxonomy.service';
import {of} from 'rxjs';
import {Taxonomy} from '@data/schema/taxonomy';

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

  constructor(@Inject(LOCALE_ID) public locale: string,
              private route : ActivatedRoute,
              private lockDeskService : LockDeskService,
              private router: Router,
              private _location: Location,
              private taxonomyService: TaxonomyService,
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
  ];

  ngOnInit(): void {

    this.getLockLoanHistory();
    this.getTaxonomy();
  }
  getLockLoanHistory(){
    this.lockDeskService.geAllActiveLockLoans().subscribe(items =>{
      items.sort((a, b) => (a.lastUpdatedDate > b.lastUpdatedDate ? -1 : 1));
      this.rowData = of(items);
      this.emitEvent();
    });
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
    this.router.navigate(['/lockdesk/lockdeskhome'])
  }



}
