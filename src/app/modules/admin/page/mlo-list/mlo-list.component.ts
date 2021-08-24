import {Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {AgGridAngular} from '@ag-grid-community/angular';
import {QuickQuoteService} from '@data/service/quickquote.service';
import { faUser} from "@fortawesome/free-solid-svg-icons";
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-mlo-list',
  templateUrl: './mlo-list.component.html',
  styleUrls: ['./mlo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MloListComponent implements OnInit {
  searchValue: any;
  cart = faUser;
  constructor(public quickQuoteService : QuickQuoteService,

              private router: Router, private _location: Location,) {
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
      headerName: "Approval Status",
      field: "floifyAccountApprovalFlag",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      valueFormatter: params => this.approvalStatus(params.data.floifyAccountApprovalFlag),
    },
    {
      headerName: "is Floify Manager",
      field: "floifyTeamManagerFlag",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      valueFormatter: params => params.data.floifyTeamManagerFlag === true ? 'Yes' : 'No',
    },
  ];
  rowData: any;
  ngOnInit(): void {
    this.quickQuoteService.getAllUserMLO().subscribe(
      userList => {
        userList.sort((a, b) => (a.lastUpdatedAt > b.lastUpdatedAt ? -1 : 1));
        this.rowData = of(userList);
       },
      error => {
        console.error(error)
      }
    );
  }
   percentFormatter(currency, sign) {
    var sansDec = currency.toFixed(3);
    return `${sansDec}`+sign;
  }
  approvalStatus(status: boolean) {
   let approvalStatus = '';
   if(status){
      approvalStatus = "Approved";
   }else{
      approvalStatus = "Pending"
    }
    return approvalStatus;
  }


  newMLO() {
    this.router.navigate(["/admin/mlo-create/add"]);
  }

  onRowClick($event: any) {
    sessionStorage.setItem('userDTO', JSON.stringify(this.usersGrid.api.getSelectedRows()[0]));
    this.router.navigate(["/admin/mlo-create/edit"]);
  }

  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this._location.back();
  }
}
