import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Location} from '@angular/common';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TaxonomyService} from '@data/service/taxonomy.service';
import {Taxonomy} from '@data/schema/taxonomy';
import {InvestorPricing} from '@data/schema/investorpricing';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {NewInvestor} from '@data/schema/new-investor';
import {BrokerCompanyInfo} from '@data/schema/company/broker-company-info';

@Component({
  selector: 'app-company-pricing-breakup',
  templateUrl: './company-pricing-breakup.component.html',
  styleUrls: ['./company-pricing-breakup.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CompanyPricingBreakupComponent implements OnInit {

  constructor(public quickQuoteService : QuickQuoteService, private _location: Location,
              private formBuilder: FormBuilder, private route : ActivatedRoute,
              private taxonomyService: TaxonomyService,private router: Router) { }
  companyUUID : string
  investors : NewInvestor[];
  optimalBlueLoanTypes : Taxonomy;
  investorPricing : InvestorPricing[];
  errorMessage ="";
  plus = faPlus;
  loading = false;
  brokerCompanyInfo :BrokerCompanyInfo = null;

  ngOnInit(): void {
    this.brokerCompanyInfo = JSON.parse(sessionStorage.getItem('brokerCompanyInfo'));
    this.companyUUID = this.route.snapshot.paramMap.get('companyUUID');


    this.quickQuoteService.getAllNewInvestorsByChannelType(this.brokerCompanyInfo.brokerCompanyDetailDTO.channelType).subscribe(i =>{
      this.investors = i;
    })
    this.taxonomyService.getAllTaxonomies().subscribe(taxonomies => {
      this.optimalBlueLoanTypes = taxonomies
        .filter(tax => tax.type === 'OBLoanType')
        .pop();
    });
    this.quickQuoteService.getCompanyPricing(this.companyUUID).subscribe(pricing => {
        this.investorPricing = pricing;
        this.investorPricing.forEach(i =>{
          i.totalMargin = i.companyMargin + i.investorMargin;
        })
      }
    );
  }
  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this.router.navigate(["/admin/company-new/edit"]);
  }
  getPricingByInvestor(invId: string) {
    if(this.investorPricing) {
      return  this.investorPricing.filter(i => i.investorId === Number(invId))
    }
  }
  getLoanTypeDesc(loanType: number) {
    if(this.optimalBlueLoanTypes) {
      return this.optimalBlueLoanTypes.taxonomyItems.filter(j => Number(j.key) === loanType).pop().description
    }
  }


}
