import {Component, OnInit, ChangeDetectionStrategy, ViewChild, Inject, LOCALE_ID} from '@angular/core';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Router} from '@angular/router';
import {formatDate, Location} from '@angular/common';
import {LogSearch} from '@data/schema/log-search';
import {AgGridAngular} from '@ag-grid-community/angular';
import {of} from 'rxjs';

@Component({
  selector: 'app-log-search-detail',
  templateUrl: './log-search-detail.component.html',
  styleUrls: ['./log-search-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogSearchDetailComponent implements OnInit {

  constructor(public quickQuoteService : QuickQuoteService,

              private router: Router, private _location: Location, @Inject(LOCALE_ID) public locale: string) {
  }

  logSearch : LogSearch;
  @ViewChild("grid") logDetailsGrid: AgGridAngular;
  columnDefs = [
    {
      headerName: "Product Detail Id",
      field: "productDetailId",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "Product Id",
      field: "productId",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150,


    },
    {
      headerName: "Quotes",
      field: "products",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150,


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
  searchValue: any;

  ngOnInit(): void {
   this.logSearch = JSON.parse(sessionStorage.getItem("LogSearchSelection"))
   this.rowData = of(this.logSearch.logSearchDetailsDTOList);

  }
  backClicked(mouseEvent: MouseEvent) {
    mouseEvent.preventDefault();
    this._location.back();}
  copyToClipboard(text) {
    if(!text){text="No Data"}
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
  }
  onRowClick($event: any) {
    sessionStorage.setItem('LogSearchSelectedProduct', JSON.stringify(this.logDetailsGrid.api.getSelectedRows()[0]));
    this.router.navigate(["/admin/log-search-selected-product"]);
  }

}
