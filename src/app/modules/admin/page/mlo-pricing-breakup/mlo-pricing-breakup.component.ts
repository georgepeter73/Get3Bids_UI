import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Location} from '@angular/common';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {TaxonomyService} from '@data/service/taxonomy.service';
import {Taxonomy} from '@data/schema/taxonomy';
import {InvestorPricing} from '@data/schema/investorpricing';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

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
  investors : Taxonomy;
  optimalBlueLoanTypes : Taxonomy;
  investorPricing : InvestorPricing[];
  errorMessage ="";
  plus = faPlus;
  loading = false;

  ngOnInit(): void {
    this.userUUID = this.route.snapshot.paramMap.get('userUUID');
    this.taxonomyService.getAllTaxonomies().subscribe(taxonomies => {
      this.investors = taxonomies
        .filter(tax => tax.type === 'OBInvestor')
        .sort(((a, b) => (b.description > a.description) ? 1 : -1))
        .pop();
    });
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
      }
    );
  }
  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this._location.back();
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
