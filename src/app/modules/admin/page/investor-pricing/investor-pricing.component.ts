import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {TaxonomyService} from '@data/service/taxonomy.service';
import {Taxonomy} from '@data/schema/taxonomy';
import {InvestorPricing} from '@data/schema/investorpricing';

@Component({
  selector: 'app-investor-pricing',
  templateUrl: './investor-pricing.component.html',
  styleUrls: ['./investor-pricing.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class InvestorPricingComponent implements OnInit {

  constructor(public quickQuoteService: QuickQuoteService, private _location: Location,
              private route: ActivatedRoute, private router: Router,
              private dialogService: NbDialogService,
              private taxonomyService: TaxonomyService) {
  }
  investors : Taxonomy;
  optimalBlueLoanTypes : Taxonomy;
  investorPricing : InvestorPricing[];
  errorMessage ="";


  ngOnInit(): void {
    this.taxonomyService.getAllTaxonomies().subscribe(taxonomies => {
      this.investors = taxonomies
        .filter(tax => tax.type === 'OBInvestor')
        .pop();
    });
    this.taxonomyService.getAllTaxonomies().subscribe(taxonomies => {
      this.optimalBlueLoanTypes = taxonomies
        .filter(tax => tax.type === 'OBLoanType')
        .pop();
    });
    this.quickQuoteService.getAllInvestorPricing().subscribe(pricing => {
        this.investorPricing = pricing;
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

  saveInvestorPricing(){
    this.errorMessage = "";
    if(this.investorPricing) {
      this.quickQuoteService.saveInvestorPricing(this.investorPricing)
        .subscribe(pricing => {
        this.investorPricing = pricing;
        this.errorMessage = "Operation Completed Successfully..."
          setTimeout(()=> {
            this.errorMessage = "";
          },1000)
      },error => {
          this.errorMessage = "Operation failed ..."
        });
    }
  }
  newInvestor(){
    alert("testing")
  }


}
