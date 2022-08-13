import {Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {AgGridAngular} from '@ag-grid-community/angular';
import {QuickQuoteService} from '@data/service/quickquote.service';
import { faUser} from "@fortawesome/free-solid-svg-icons";
import {of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {TaxonomyService} from '@data/service/taxonomy.service';
import {GlobalService} from '@app/service/global.service';
import {Taxonomy} from '@data/schema/taxonomy';
import {BrokerCompanyInfo} from '@data/schema/company/broker-company-info';
@Component({
  selector: 'app-mlo-list',
  templateUrl: './mlo-list.component.html',
  styleUrls: ['./mlo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MloListComponent implements OnInit {
  searchValue: any;
  cart = faUser;
  channelTypeTaxonomy: Taxonomy;
  taxonomyLoading  = false;
  brokerCompanyLoading: boolean;
  brokerCompanyList: BrokerCompanyInfo[] = [];
  showGrid = false;
  rowData: any;
  channelType: string;
  brokercompanyId: number;
  userLoading = false;
  showDropDowns = true;
  constructor(public quickQuoteService : QuickQuoteService,

              private router: Router, private _location: Location,
              private route : ActivatedRoute,
              private taxonomyService: TaxonomyService,
              private globalService : GlobalService) {
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

  ngOnInit(): void {
    this.showGrid = false;
    this.brokercompanyId = parseInt(this.route.snapshot.paramMap.get('brokerCompanyId'));
    if(this.brokercompanyId){
      this.showDropDowns = false;
      this.showGrid = true;
      this.loadUsers();
    }
   else {
      this.loadTaxonomy();
      this.showGrid = false;
      this.showDropDowns = true;
    }

  }
  loadBrokerCompany() {
    this.brokerCompanyLoading = true;
     this.quickQuoteService.getBrokerCompanyByChannelType(
        this.globalService.getLoggedInUser().clientId, this.channelType).subscribe(c => {
        this.brokerCompanyList = c;
        this.brokerCompanyLoading = false;
        this.globalService.setBrokerCompanyInfos(c);
      })
   }
  onGridReady(params) {
    params.api.showLoadingOverlay();

  }

  loadTaxonomy(){
    this.taxonomyLoading = true;
    this.taxonomyService.getAllTaxonomies().subscribe(taxonomies => {
      this.channelTypeTaxonomy = taxonomies
        .filter(tax => tax.type === 'ChannelType')
        .pop();
      this.taxonomyLoading = false;
    });
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
     this.router.navigate(["/admin/mlo-create/add/"+this.brokercompanyId]);
  }

  onRowClick($event: any) {
    sessionStorage.setItem('userDTO', JSON.stringify(this.usersGrid.api.getSelectedRows()[0]));
    this.router.navigate(["/admin/mlo-create/edit/"+this.brokercompanyId]);
  }

  backClicked($event: MouseEvent) {
    this.globalService.setBrokerCompanyInfos(this.brokerCompanyList);
    this.globalService.setSelectedChannelType(this.channelType);
    $event.preventDefault();
    this.router.navigate(["/admin/admin-dash"]);

  }
  loadUsers() {
    this.userLoading = true;
    this.showGrid = true;
    this.quickQuoteService.getAllUserMLOByBrokerCompanyid(this.brokercompanyId).subscribe(res =>{
       this.rowData = of(res);
         this.userLoading = false;
      });
    }

}
