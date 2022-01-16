import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {TaxonomyService} from '@data/service/taxonomy.service';
import {BrokerCompanyInfo} from '@data/schema/company/broker-company-info';
import {Taxonomy} from '@data/schema/taxonomy';
import {UserMlo} from '@data/schema/user/user-mlo';
import {of} from 'rxjs';

@Component({
  selector: 'app-company-new',
  templateUrl: './company-new.component.html',
  styleUrls: ['./company-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CompanyNewComponent implements OnInit {

  brokerCompanyInfo = new BrokerCompanyInfo();
  channelTypeTaxonomy : Taxonomy = null;
  loading: any;
  loading1: any;
  successCreation = false;
  failureCreation = false;
  mode :string ="";

  loading2: any;

  constructor(public quickQuoteService: QuickQuoteService, private _location: Location,
              private route: ActivatedRoute, private router: Router,
              private dialogService: NbDialogService,
              private taxonomyService: TaxonomyService) {
  }

  ngOnInit(): void {
    this.mode = this.route.snapshot.paramMap.get('mode');
    if(this.mode === 'edit') {
      this.brokerCompanyInfo = JSON.parse(sessionStorage.getItem("brokerCompanyInfo"));

    }
     this.taxonomyService.getAllTaxonomies().subscribe(taxonomies => {
     this.channelTypeTaxonomy = taxonomies
        .filter(tax => tax.type === 'ChannelType')
        .pop();
    });

  }


  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this.router.navigate(["/admin/company-list"]);
  }



  createCompany() {
    this.loading = true;
    this.successCreation = false;
    this.failureCreation = false;
      this.quickQuoteService.createNewCompany(this.brokerCompanyInfo).subscribe(res =>{
        this.brokerCompanyInfo = res;
        this.loading = false;
          this.successCreation = true;
      },error => {
        this.failureCreation = true;
        this.loading = false;
        }
      )
  }

  saveCompany() {
    this.loading1 = true;
    this.successCreation = false;
    this.failureCreation = false;
    this.quickQuoteService.saveCompany(this.brokerCompanyInfo).subscribe(res =>{
        this.brokerCompanyInfo = res;
        this.loading1 = false;
        this.successCreation = true;
      },error => {
        this.failureCreation = true;
        this.loading = false;
      }
    )

  }

  usersList() {
    this.router.navigate(["/admin/company-users-list/"+this.brokerCompanyInfo.brokercompanyId]);
  }
}
