import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Location} from '@angular/common';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {TaxonomyService} from '@data/service/taxonomy.service';
import {Taxonomy} from '@data/schema/taxonomy';
import {InvestorPricing} from '@data/schema/investorpricing';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {NewInvestor} from '@data/schema/new-investor';
import {BrokerCompanyInfo} from '@data/schema/company/broker-company-info';

@Component({
  selector: 'app-mlo-pricing-breakup',
  templateUrl: './mlo-pricing-breakup.component.html',
  styleUrls: ['./mlo-pricing-breakup.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MloPricingBreakupComponent implements OnInit {

  constructor(public quickQuoteService : QuickQuoteService, private _location: Location,
              private formBuilder: FormBuilder, private route : ActivatedRoute,
              private taxonomyService: TaxonomyService) { }
  userUUID : string

  investors : NewInvestor[];
  optimalBlueLoanTypes : Taxonomy;
  investorPricing : InvestorPricing[];
  errorMessage ="";
  plus = faPlus;
  loading = false;
  brokerCompanyInfo :BrokerCompanyInfo = null;

  ngOnInit(): void {
    this.brokerCompanyInfo = JSON.parse(sessionStorage.getItem('brokerCompanyInfo'));
    this.quickQuoteService.getAllNewInvestorsByChannelType(this.brokerCompanyInfo.brokerCompanyDetailDTO.channelType).subscribe(i =>{
      this.investors = i;
    })

    this.userUUID = this.route.snapshot.paramMap.get('userUUID');
    this.taxonomyService.getAllTaxonomies().subscribe(taxonomies => {
      this.optimalBlueLoanTypes = taxonomies
        .filter(tax => tax.type === 'OBLoanType')
        .pop();

    });
    this.quickQuoteService.getUserMLOPricing(this.userUUID).subscribe(pricing => {
        this.investorPricing = pricing;
           this.investorPricing.forEach(i =>{
          i.totalMargin = i.loMargin + i.investorMargin + i.companyMargin;
        })

      console.log(this.investorPricing)

      }
    );
  }
  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this._location.back();
  }
  getPricingByInvestor(invId: number) {
    if(this.investorPricing) {
      console.log(invId)
       return  this.investorPricing.filter(i => i.investorId === invId)
    }
  }
  getLoanTypeDesc(loanType: number) {
    if(this.optimalBlueLoanTypes) {
      return this.optimalBlueLoanTypes.taxonomyItems.filter(j => Number(j.key) === loanType).pop().description
    }
  }

}
