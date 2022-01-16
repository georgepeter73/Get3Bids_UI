import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {TaxonomyService} from '@data/service/taxonomy.service';
import {BrokerCompanyInfo} from '@data/schema/company/broker-company-info';
import {Taxonomy} from '@data/schema/taxonomy';
import { faInfo} from "@fortawesome/free-solid-svg-icons";
import {environment} from '@env';

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
  brokerCompanyLink = "";
  loading2: any;
  frontendurl = environment.FRONT_END_URL;
  info = faInfo;

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
    this.createURL();
     this.taxonomyService.getAllTaxonomies().subscribe(taxonomies => {
     this.channelTypeTaxonomy = taxonomies
        .filter(tax => tax.type === 'ChannelType')
        .pop();
    });

  }
  createURL(){
    if(this.brokerCompanyInfo.companyUUID) {
      this.brokerCompanyLink = this.frontendurl + '/quickquote/borrower-info/' + this.brokerCompanyInfo.companyUUID + '/website';
    }
  }


  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this.router.navigate(["/admin/company-list"]);
  }

  copyToClipboard(text) {
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
  }


  createCompany() {
    this.loading = true;
    this.successCreation = false;
    this.failureCreation = false;
      this.quickQuoteService.createNewCompany(this.brokerCompanyInfo).subscribe(res =>{
        this.brokerCompanyInfo = res;
        this.loading = false;
          this.successCreation = true;
          this.createURL();
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
        setTimeout(() => {
        this._location.back();
      }, 1000);
      },error => {
        this.failureCreation = true;
        this.loading = false;
      }
    )

  }

  usersList() {
    this.router.navigate(["/admin/company-users-list/"+this.brokerCompanyInfo.brokercompanyId]);
  }

  showBreakUp() {
    this.router.navigate(["/admin/company-pricing-breakup/"+this.brokerCompanyInfo.companyUUID]);
  }
}
