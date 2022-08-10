import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {UserMlo} from '@data/schema/user/user-mlo';
import {NgForm} from '@angular/forms';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '@env';
import {LoSiteDTO} from '@data/schema/user/lo-site';
import {UserContact} from '@data/schema/user/user-contact';
import { faInfo} from "@fortawesome/free-solid-svg-icons";
import {BrokerCompanyInfo} from '@data/schema/company/broker-company-info';
import {TaxonomyService} from '@data/service/taxonomy.service';
import {Taxonomy} from '@data/schema/taxonomy';

@Component({
  selector: 'app-mlo',
  templateUrl: './mlo.component.html',
  styleUrls: ['./mlo.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MloComponent implements OnInit {
  userMLO : UserMlo = new UserMlo();
  userContactInfo : UserContact = new UserContact();
  loSite : LoSiteDTO = new LoSiteDTO();
  userMLOManager : UserMlo[] ;
  loading: any;
  crudType : string;
  buttonText: string;
  buttonPressed = false;
  errorMessage ="";
  frontendurl = environment.FRONT_END_URL;
  mloLink : string;
  loading1: any;
  info = faInfo;
  brokerCompanyList : BrokerCompanyInfo[] =  [];
  brokerCompanyId ="";
  floidfyChecked="checked";
  lendingpadChecked="";
  posTypeTaxonomy : Taxonomy;
  brokerCompanyInfo = new BrokerCompanyInfo();
  mloEmailExist = false;


  constructor(public quickQuoteService : QuickQuoteService, private _location: Location,
              private route : ActivatedRoute, private router: Router,private taxonomyService: TaxonomyService) {
  }
  ngOnInit(): void {
    this.crudType = this.route.snapshot.paramMap.get('crudType');
    this.brokerCompanyId = this.route.snapshot.paramMap.get('brokerCompanyId');
    this.userMLO.brokercompanyId = parseInt(this.brokerCompanyId);
    this.taxonomyService.getAllTaxonomies().subscribe(taxonomies => {
      this.posTypeTaxonomy = taxonomies
        .filter(tax => tax.type === 'POSType')
        .sort(((a, b) => (b.description > a.description) ? 1 : -1))
        .pop();

    });

    if(this.crudType == 'edit') {
      this.userMLO = JSON.parse(sessionStorage.getItem("userDTO"));
      this.buttonText = "Update MLO";
      this.buttonPressed = false;
      this.mloLink = this.frontendurl+'/quickquote/borrower-info/'+this.userMLO.userUUID+'/website';
      }else{
      this.buttonText = "Create MLO"
      this.buttonPressed = false;
      //defaulting the new user to be a manager by default
      this.userMLO.floifyTeamManagerFlag=true;
      this.loSite.siteType = '103';
      this.userMLO.loSiteDTO = this.loSite;
      this.userContactInfo.deleteFlag = false;
      this.userMLO.userContact = this.userContactInfo;
      this.userMLO.loSiteDTO.posType="101";
    }
    this.quickQuoteService.getAllUserMLO().subscribe(
      userList => {
        this.userMLOManager = userList.filter(u => u.floifyTeamManagerFlag = true);
        this.userMLOManager = userList.filter(u => u.floifyAccountApprovalFlag = true);
        this.userMLOManager.sort((a, b) => (a.lastUpdatedAt > b.lastUpdatedAt ? -1 : 1));
      },
      error => {
        console.log(error);
      }
    );
    this.quickQuoteService.getAllBrokerCompany().subscribe(c =>{
      this.brokerCompanyList = c;
      this.brokerCompanyInfo = c.filter(bc => bc.brokercompanyId === this.userMLO.brokercompanyId).pop();
      sessionStorage.setItem("brokerCompanyInfo1",JSON.stringify(this.brokerCompanyInfo));
    })
  }
  isMLOEmailExist(email : string){

    this.quickQuoteService.getUserByEmail(email).subscribe(user => {
      if(user.userUUID){
        this.mloEmailExist = true;
      }else{
        this.mloEmailExist = false;
      }
    })
  }
  submitOrderFinal(form: NgForm){
    this.buttonPressed = true;
    this.loading = true;
    if (this.userMLO.userId > 0){
      this.mloEmailExist = false;
      this.submitOrder(form);
    }else {
      //check for email only during new operation
      this.quickQuoteService.getUserByEmail(this.userMLO.userName).subscribe(user => {
        if (user.userUUID) {
          this.mloEmailExist = true;
          this.loading = false;
        } else {
          this.mloEmailExist = false;
          this.submitOrder(form);
        }
      })
    }
  }
  submitOrder(form: NgForm) {
    if(this.userMLO.floifyTeamManagerFlag){
      this.userMLO.floifyTeamManagerId = 0;
    }else{
      this.userMLO.reportToUserId = this.userMLO.floifyTeamManagerId;
    }
    if(this.userMLO.userId > 0){
      this.userMLO.lastUpdatedAt = new Date();
    }
      this.quickQuoteService.saveUserMLO(this.userMLO).subscribe(res =>{
      this.userMLO = res;
      this.mloLink = this.frontendurl+'/quickquote/borrower-info/'+this.userMLO.userUUID+'/website';
      this.loading = false;
       if(this.userMLO.userId>0){
        this.buttonText = "Update MLO"
      }
        setTimeout(() => {
          this.router.navigate(["/admin/mlo-list/"+this.userMLO.brokercompanyId]);
        }, 100);
    },
      error => {
        this.loading = false;
        this.errorMessage = JSON.stringify(error);
      }
    );
  }

  backClicked(mouseEvent: MouseEvent) {
    mouseEvent.preventDefault();
    this.router.navigate(["/admin/mlo-list/"+this.userMLO.brokercompanyId]);
  }
   copyToClipboard(text) {
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
  }

  mloMedia() {
     sessionStorage.setItem("userMLOForMedia",JSON.stringify(this.userMLO));
     this.router.navigate(["/admin/mlo-media"]);
  }
  showBreakUp(){
    this.router.navigate(["/admin/mlo-pricing-breakup/"+this.userMLO.userUUID]);
  }
}
