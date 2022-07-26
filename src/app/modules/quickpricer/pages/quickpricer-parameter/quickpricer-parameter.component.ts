import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {faUser,faDollarSign,faHome,faMoneyCheckAlt} from '@fortawesome/free-solid-svg-icons';
import {TaxonomyService} from '@data/service/taxonomy.service';
import {Taxonomy} from '@data/schema/taxonomy';
import {GlobalService} from '@app/service/global.service';
import {QuickQuote, QuickQuoteAddress} from '@data/schema/lockdesk';

@Component({
  selector: 'app-quickpricer-parameter',
  templateUrl: './quickpricer-parameter.component.html',
  styleUrls: ['./quickpricer-parameter.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class QuickpricerParameterComponent implements OnInit {
  faperson = faUser;
  fadollar = faDollarSign;
  famoneycheck=faMoneyCheckAlt;
  faHome = faHome;
  occupancyTaxonomy : Taxonomy;
  propertyInfoTaxonomy : Taxonomy;
  incomeDocumentationTaxonomy : Taxonomy;
  miTypesTaxonomy : Taxonomy;
  prePaymentPenalty : Taxonomy;
  purposeTypeTaxonomy : Taxonomy;
  quickQuote : QuickQuote;
  address: Object;
  form = {
    zipcode: null,
    city: '',
    state: '',
    cityList: [],
    stateList: [],
    stateDesc: ''
  };
  formattedAddress: string;
  invalidZipCode = true;
  constructor(private router: Router,
              private _location: Location,
              private taxonomyService: TaxonomyService,
              private  globalService: GlobalService,

  ) {
  }

  ngOnInit(): void {
    this.getTaxonomy();
     this.globalService.getQuickQuote().subscribe(qq =>
     {
       this.quickQuote = qq ;
       this.calculateParams();
       if (qq.quoteAddressDTO) {
         this.form.zipcode = qq.quoteAddressDTO.zip;
         this.form.city = qq.quoteAddressDTO.city;
         this.form.state = qq.quoteAddressDTO.state;
       }else{
         this.quickQuote.quoteAddressDTO = new QuickQuoteAddress(
           null,
           null,
          null,
           null,
           null,
           null,
           null,
           null,
           null
         );
       }

    });

  }
  calculateParams(){
    if(this.quickQuote && this.quickQuote.purchasePrice && this.quickQuote.downpayment){
      this.quickQuote.requestedLoanAmount = this.quickQuote.purchasePrice - this.quickQuote.downpayment;
      if(this.quickQuote.propertyValue) {
        this.quickQuote.loanToValue = (this.quickQuote.requestedLoanAmount / this.quickQuote.propertyValue) ;
      }
    }

  }
  emitClickEvent(){
    // hack for data not displaying with out a mouse click
    this.eventFire(document.getElementById('refreshButtonId'), 'click');
  }
  eventFire(el, etype) {
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      const evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }
  getTaxonomy(){

    this.taxonomyService.getAllTaxonomies().subscribe(taxonomies => {
      this.occupancyTaxonomy = taxonomies
        .filter(tax => tax.type === 'QQOccupancyType')
        .pop();
      this.propertyInfoTaxonomy = taxonomies
        .filter(tax => tax.type === 'QQPropertyInfoType')
        .pop();
      this.incomeDocumentationTaxonomy = taxonomies
        .filter(tax => tax.type === 'QQIncomeDocumentationType')
        .pop();
      this.miTypesTaxonomy = taxonomies.filter(tax => tax.type === 'QQMITypes').pop();
      this.prePaymentPenalty = taxonomies
        .filter(tax => tax.type === 'QQPrepaymentPenaltyTypes')
        .pop();
      this.purposeTypeTaxonomy = taxonomies
        .filter(tax => tax.type === 'QQTransactionType')
        .pop();
    });


  }
  getAddress(place: object) {
    this.address = place['formatted_address'];
    this.form.city = this.getCity(place);
    this.form.stateDesc = this.getState(place);
    this.form.state = this.getState(place);
    this.form.zipcode = this.getPostCode(place);
    this.formattedAddress = place['formatted_address'];
    if (
      this.form.zipcode !== undefined &&
      String(this.form.zipcode).length >= 3
    ) {
      this.invalidZipCode = false;
    } else {
      this.invalidZipCode = true;
    }
    if (this.form.zipcode && String(this.form.zipcode).length >= 3) {
      if (this.form.state) {
         this.quickQuote.quoteAddressDTO = new QuickQuoteAddress(
          null,
          null,
          this.form.zipcode,
          this.form.state,
          null,
          this.form.city,
          null,
          null,
          null
        );
        this.emitClickEvent();
       }
    }
    this.globalService.setQuickQuote(this.quickQuote);
   }
  getAddrComponent(place, componentTemplate) {
    let result;

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }
  getCity(place) {
    const COMPONENT_TEMPLATE = { locality: 'long_name' },
      city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return city;
  }
  getState(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_1: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }
  getPostCode(place) {
    const COMPONENT_TEMPLATE = { postal_code: 'long_name' },
      postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return postCode;
  }

  backClicked($event: MouseEvent) {
    this.globalService.setQuickQuote(this.quickQuote);
    $event.preventDefault();
    this.router.navigate(['/lockdesk/lockdeskhome'])
  }

  search() {
    this.globalService.setQuickQuote(this.quickQuote);
    this.router.navigate(['/quickpricer/rate-quote-product'])
  }
}
