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
      headerName: "Margin %",
      field: "loMargin",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      valueFormatter: params => this.percentFormatter(params.data.loMargin, ""),
      width : 120,
      resizable : true,
      minWidth: 100

    },
    {
      headerName: "Email",
      field: "userName",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 200
    },
    {
      headerName: "Floify Status",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      valueFormatter: params => this.approvalStatus(params.data.loSiteDTO.floifyAPIKey),
      width : 130,
      resizable : true,
      minWidth: 100
    },
    {
      headerName: "is Floify Manager",
      field: "floifyTeamManagerFlag",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      valueFormatter: params => params.data.floifyTeamManagerFlag === true ? 'Yes' : 'No',
      width : 130,
      resizable : true,
      minWidth: 100
    },
  ];
  rowData: any;
  ngOnInit(): void {
    this.quickQuoteService.getAllUserMLO().subscribe(
      userList => {
        userList.sort((a, b) => (a.lastUpdatedAt > b.lastUpdatedAt ? -1 : 1));
        this.rowData = of(userList);
        setTimeout(()=>{this.usersGrid.api.sizeColumnsToFit()}, 50);
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
  approvalStatus(floifyAPI: string) {
   let approvalStatus = '';
   if(floifyAPI && floifyAPI.length > 0){
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
    this.router.navigate(["/admin/mlo-list"]);
  }
}
