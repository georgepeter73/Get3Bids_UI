import {Component, OnInit, ChangeDetectionStrategy, ViewChild, Inject, LOCALE_ID} from '@angular/core';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Router} from '@angular/router';
import {formatDate, Location} from '@angular/common';
import {AgGridAngular} from '@ag-grid-community/angular';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {of} from 'rxjs';

@Component({
  selector: 'app-log-search',
  templateUrl: './log-search.component.html',
  styleUrls: ['./log-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LogSearchComponent implements OnInit {

  constructor(public quickQuoteService : QuickQuoteService,

              private router: Router, private _location: Location, @Inject(LOCALE_ID) public locale: string) {
  }
  searchValue: any;
  cart = faUser;
  @ViewChild("grid") logGrid: AgGridAngular;
  columnDefs = [
    {
      headerName: "Quote Id",
      field: "quoteId",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "MLO",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150,
      valueGetter: this.getMLOName

    },
    {
      headerName: "Loan Amount",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150,
      valueGetter: this.getLoanAmount

    },
    {
      headerName: "Loan Type",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150,
      valueGetter: this.getLoanType

    },
    {
      headerName: "Loan Purpose",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150,
      valueGetter: this.getLoanPurpose

    },
    {
      headerName: "First Name",
      field: "firstName",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "Last Name",
      field: "lastName",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "Email",
      field: "email",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },

    {
      headerName: "OB Request",
      field: "quoteRequest",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "OB Response",
      field: "products",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "Floify Request",
      field: "floifyRequestData",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "Floify Response",
      field: "floifyResponseData",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "Date",
      field: "lastUpdatedAt",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 100,
      cellRenderer: (data) => {
        return data.value ? formatDate(data.value, 'd MMM yyyy h:MM', this.locale) : '';
      },
    },

  ];
  rowData: any;

  ngOnInit(): void {
    this.quickQuoteService.searchLog().subscribe(logData =>{
      logData.sort((a, b) => (a.lastUpdatedAt > b.lastUpdatedAt ? -1 : 1));
      this.rowData = of(logData)
     })
  }
  getLoanAmount(params) {
    if (params.data.quoteRequest) {
      const quoteRequest = JSON.parse(params.data.quoteRequest)
       return quoteRequest.loanInformation.baseLoanAmount
    }
    return ''
  }
  getLoanType(params) {
    if (params.data.quoteRequest) {
      const quoteRequest = JSON.parse(params.data.quoteRequest)
      return quoteRequest.loanInformation.loanType
    }
    return ''
  }
  getLoanPurpose(params) {
    if (params.data.quoteRequest) {
      const quoteRequest = JSON.parse(params.data.quoteRequest)
       return quoteRequest.loanInformation.loanPurpose
    }
    return ''
  }
  getMLOName(params) {
    if (params.data.userMLO) {
      return params.data.userMLO.firstName +" "+params.data.userMLO.lastName
    }
    return ''
  }
  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this._location.back();
  }
  onRowClick($event: any) {
    sessionStorage.setItem('LogSearchSelection', JSON.stringify(this.logGrid.api.getSelectedRows()[0]));
    this.router.navigate(["/admin/log-search-detail"]);
  }

}
