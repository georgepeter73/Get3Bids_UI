import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {TaxonomyService} from '@data/service/taxonomy.service';
import {of} from 'rxjs';
import {UserMlo} from '@data/schema/user/user-mlo';

@Component({
  selector: 'app-company-users-list',
  templateUrl: './company-users-list.component.html',
  styleUrls: ['./company-users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CompanyUsersListComponent implements OnInit {
  userMLOS : UserMlo[] =[];
  rowData: any;
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

  ];

  constructor(public quickQuoteService: QuickQuoteService, private _location: Location,
              private route: ActivatedRoute, private router: Router,
              private dialogService: NbDialogService,
              private taxonomyService: TaxonomyService) {
  }
  brokerCompanyId =0;


  ngOnInit(): void {
    this.brokerCompanyId = parseInt(this.route.snapshot.paramMap.get('brokercompanyid'));
    this.quickQuoteService.getAllUserMLOByBrokerCompanyid(this.brokerCompanyId).subscribe(res =>{
      this.userMLOS = res;
      this.rowData = of(res);
    })
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

  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this.router.navigate(["/admin/company-new/edit"]);
  }
}
