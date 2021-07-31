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
    {
      headerName: "Margin %",
      field: "loMargin",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      valueFormatter: params => this.percentFormatter(params.data.loMargin, ""),

    },
    {
      headerName: "Email",
      field: "userName",
      sortable: true,
      filter: true,
      checkboxSelection: false
    },
    {
      headerName: "is Floify Manager",
      field: "floifyTeamManagerFlag",
      sortable: true,
      filter: true,
      checkboxSelection: false
    },
    {
      headerName: "Floify Manager",
      field: "floifyTeamManagerId",
      sortable: true,
      filter: true,
      checkboxSelection: false
    },

  ];

  rowData: any;
  ngOnInit(): void {
    this.quickQuoteService.getAllUserMLO().subscribe(
      userList => {
        userList.sort((a, b) => (a.lastUpdatedAt > b.lastUpdatedAt ? -1 : 1));
        userList = userList.filter(u => u.loMargin>0)
        this.rowData = of(userList);
       },
      error => {}
    );
  }
   percentFormatter(currency, sign) {
    var sansDec = currency.toFixed(3);
    return `${sansDec}`+sign;
  }


  newMLO() {
    this.router.navigate(["/admin/mlo-create/add"]);
  }

  onRowClick($event: any) {
    sessionStorage.setItem('userDTO', JSON.stringify(this.usersGrid.api.getSelectedRows()[0]));
    this.router.navigate(["/admin/mlo-create/edit"]);
  }

  onGridReady($event: any) {

  }

  backClicked($event: MouseEvent) {

  }
}
