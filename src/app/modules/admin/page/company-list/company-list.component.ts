import {Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {AgGridAngular} from '@ag-grid-community/angular';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {of} from 'rxjs';
import {Taxonomy} from '@data/schema/taxonomy';
import {TaxonomyService} from '@data/service/taxonomy.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CompanyListComponent implements OnInit {

  searchValue: any;
  cart = faUser;
  rowData: any;
  channelTypeTaxonomy : Taxonomy = null;
  @ViewChild("grid") companyGrid: AgGridAngular;
  columnDefs = [
    {
      headerName: "Company Name",
      field: "name",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "NMLS",
      field: "brokerCompanyDetailDTO.nmls",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "Channel Type",
      field: "brokerCompanyDetailDTO.channelType",
      sortable: true,
      valueFormatter: params => this.channelTypeDesc(params.data.brokerCompanyDetailDTO.channelType),
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "When",
      field: "lastUpdatedAt",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "Who",
      field: "lastUpdatedBy",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    }

  ];

  constructor(public quickQuoteService : QuickQuoteService,

              private router: Router, private _location: Location,private taxonomyService: TaxonomyService) {
  }

  ngOnInit(): void {
    this.taxonomyService.getAllTaxonomies().subscribe(taxonomies => {
      this.channelTypeTaxonomy = taxonomies
        .filter(tax => tax.type === 'ChannelType')
        .pop();
    });
    this.quickQuoteService.getAllBrokerCompany().subscribe(
      clist => {
        clist.sort((a, b) => (a.lastUpdatedAt > b.lastUpdatedAt ? -1 : 1));
        this.rowData = of(clist);
        setTimeout(()=>{this.companyGrid.api.sizeColumnsToFit()}, 50);
      },
      error => {
        console.error(error)
      }
    );
  }
  channelTypeDesc(cType: string) {
    let channelType = '';
    channelType = this.channelTypeTaxonomy.taxonomyItems.filter(t => t.key === cType).pop().description;
    return channelType;

  }

  onRowClick($event: any) {
    sessionStorage.setItem('brokerCompanyInfo', JSON.stringify(this.companyGrid.api.getSelectedRows()[0]));
    this.router.navigate(["/admin/company-new/edit"]);
  }

  newBrokerCompany() {
    this.router.navigate(["/admin/company-new/new"]);
  }

  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this.router.navigate(["/admin/admin-dash"]);
  }
}
