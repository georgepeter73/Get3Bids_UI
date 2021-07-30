import {Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {AgGridAngular} from '@ag-grid-community/angular';
import {QuickQuoteService} from '@data/service/quickquote.service';
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {of} from 'rxjs';
import {Router} from '@angular/router';
@Component({
  selector: 'app-mlo-list',
  templateUrl: './mlo-list.component.html',
  styleUrls: ['./mlo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MloListComponent implements OnInit {
  searchValue: any;
  cart = faShoppingCart;
  constructor(public quickQuoteService : QuickQuoteService,

              private router: Router,) {
  }
  @ViewChild("grid") usersGrid: AgGridAngular;
  columnDefs = [
    {
      headerName: "First Name",
      field: "firstName",
      sortable: true,
      filter: true,
      checkboxSelection: false
    },
    {
      headerName: "Last Name",
      field: "lastName",
      sortable: true,
      filter: true,
      checkboxSelection: false
    },

  ];
  rowData: any;
  ngOnInit(): void {
    this.quickQuoteService.getAllUserMLO().subscribe(
      userList => {
        this.rowData = of(userList);
       },
      error => {}
    );
  }

  newMLO() {
    this.router.navigate(["/mlo-create"]);
  }

  onRowClick($event: any) {

  }

  onGridReady($event: any) {

  }
}
