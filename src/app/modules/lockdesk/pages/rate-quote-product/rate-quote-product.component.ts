import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LockDeskService} from '@data/service/lockdesk.service';
import {Location} from '@angular/common';
import {QuickQuoteResults} from '@data/schema/lockdesk/quick-quote-results';
import {QuickQuoteResultsRoot} from '@data/schema/lockdesk/quick-quote-results-root';
import {Product} from '@data/schema/lockdesk/product';
import {ProductDetailRoot} from '@data/schema/lockdesk/product-detail-root';
import {ProductDetail} from '@data/schema/lockdesk/product-detail';
import {Quote} from '@data/schema/lockdesk/quote';
import {TaxonomyItem} from '@data/schema/taxonomy-item';
import {BrokerCompanyInfo} from '@data/schema/company/broker-company-info';
import {BrokerCompanyMedia} from '@data/schema/company/broker-company-media';
import {KeyValuePair} from '@data/schema/lockdesk';
import {ProductGroup} from '@data/schema/lockdesk/productgroup';
import {GlobalService} from '@app/service/global.service';
import {Investor} from '@data/schema/lockdesk/investor';
import {firstBy} from 'thenby';
import {UserMlo} from '@data/schema/user/user-mlo';

@Component({
  selector: 'app-rate-quote-product',
  templateUrl: './rate-quote-product.component.html',
  styleUrls: ['./rate-quote-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RateQuoteProductComponent implements OnInit {
  private selectedUserMloUUID: string;

  constructor(private route: ActivatedRoute, private lockDeskService: LockDeskService, private router: Router,
              private _location: Location, private globalService: GlobalService,) {
  }

  loanNumber = '';
  qqRes: QuickQuoteResults;
  qqResRoot: QuickQuoteResultsRoot;
  product: Product;
  products: Product[];
  productDetailRoot: ProductDetailRoot;
  product_detail: ProductDetail;
  rateIndexSelected: string;
  rateSelected: Quote;
  productFilterList: KeyValuePair[] = [];
  productFilterSelected: string;
  rateLockFilterList: KeyValuePair[] = [];
  rateLockFilterSelected: string;
  sortBy = 'interestRate';
  transactionTypeDesc = 'n/a';
  documentationTypeDesc = 'n/a';
  loading = false;
  radioButtonrateSelected = false;
  miTypeShortDesc: string;
  mobileButtonShow = false;
  errorMessage: string;
  noLoanProducts = false;
  selectedMoreInfoButtonIndex = -1;
  loanTypeList: KeyValuePair[] = [];
  loanTypeSelected: string;
  filteredProductList: Product[];
  loanType: KeyValuePair[] = [];
  creditScoreTypeDesc = 'n/a';
  noPricing: TaxonomyItem;
  pricingFound: TaxonomyItem;
  moreInfoClicked = false;
  userMLO: UserMlo;
  companyUserMLOList: UserMlo[] = [];
  companyLOUUID = '';
  brokerCompanyInfo = new BrokerCompanyInfo();
  // set this to true to test pricing at company, mlo and investor level
  // by default it needs to be false
  priceTesting = false;
  showHelpVideo = true;
  isWholesaleChannel = false;
  isGuidelineDownloaded = false;
  companyLogoMedia = new BrokerCompanyMedia();
  requestType :string;


  ngOnInit(): void {
    this.selectedMoreInfoButtonIndex = -1;
    this.loanTypeList = this.globalService.loanTypeList;
    this.loanNumber = this.route.snapshot.paramMap.get('loanNumber');
    this.requestType = this.route.snapshot.paramMap.get('requestType');
    this.selectedUserMloUUID = this.route.snapshot.paramMap.get('selectedUserMloUUID');
    this.QuoteResults();
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

  refreshGrid($event: MouseEvent) {
    $event.preventDefault();

  }

  QuoteResults() {
    this.lockDeskService
      .getQuoteResults(this.loanNumber,this.selectedUserMloUUID)
      .subscribe(
        quickQuoteResultsRoot => {
          this.qqRes = quickQuoteResultsRoot.obBestExResponseDTO;
          this.qqResRoot = quickQuoteResultsRoot;
           if (quickQuoteResultsRoot.obBestExResponseDTO) {
            this.products = quickQuoteResultsRoot.obBestExResponseDTO.products;
             this.emitClickEvent();
            this.filterProductFilter();
            this.filterLoanTypeFilter();
            if (
              quickQuoteResultsRoot.obBestExResponseDTO.products &&
              quickQuoteResultsRoot.obBestExResponseDTO.products.length === 0
            ) {
              this.noLoanProducts = true;
            } else if (!quickQuoteResultsRoot.obBestExResponseDTO.products) {
              this.noLoanProducts = true;
            }
             this.globalService.setQQRes(this.qqRes);

             } else {
               this.noLoanProducts = true;
             }
            this.filterProductsByProductType();
            this.emitClickEvent();

        },
        err => {

          this.errorMessage = JSON.stringify(err);
          this.emitClickEvent();
          console.log(this.errorMessage);
        }
      );
  }

  emitClickEvent(){
    // hack for data not displaying with out a mouse click
    this.eventFire(document.getElementById('refreshButtonId'), 'click');
  }
  filterProductFilter() {
    this.productFilterList = this.globalService.productFilterList;

    if (this.products) {
      this.products.forEach(result => {
        this.productFilterList = this.productFilterList.filter(keyPair =>
          this.isKeyAvailable(keyPair.key, this.products)
        );
        this.productFilterSelected = this.productFilterList.length
          ? this.productFilterList[0].key
          : '';
        this.onSortChange(this.sortBy);
      });
    }

  }

  filterLoanTypeFilter() {
    if (this.products) {
       this.loanTypeList = this.loanTypeList.filter(keyPair =>
          this.isLoanTypeKeyAvailable(keyPair.key, this.products)
        );
        this.loanTypeSelected = '';
        this.onSortChange(this.sortBy);
    }
  }

  isLoanTypeKeyAvailable(key, products) {
    if (products) {
      for (let product of products) {
         if (product.loanType === key) {
          return true;
        }
      }
    }
    return false;
  }
  isKeyAvailableInProduct(key, product) {
        if (
          product.amortizationType ===
          this.productGrouping(key).amortizationType &&
          product.amortizationTerm ===
          String(this.productGrouping(key).amortizationTerm) &&
          product.productName.includes(
            this.productGrouping(key).productName
          )
        ) {
          return true;
        }
    return false;
  }

  isKeyAvailable(key, products) {
    if (products) {
      for (let product of products) {
        if (
          product.amortizationType ===
          this.productGrouping(key).amortizationType &&
          product.amortizationTerm ===
          String(this.productGrouping(key).amortizationTerm) &&
          product.productName.includes(
            this.productGrouping(key).productName
          )
        ) {
          return true;
        }
      }
    }
    return false;
  }
  filterProductsByLoanType() {
    if (this.qqResRoot.obBestExResponseDTO.products && this.loanTypeSelected) {
      this.products =
        this.qqResRoot.obBestExResponseDTO.products.filter(
          p => p.loanType === this.loanTypeSelected
        );
      this.onSortChange(this.sortBy);
    }
  }
  filterProductsByProductType() {
    if (this.qqResRoot.obBestExResponseDTO.products && this.productFilterSelected) {
      this.products =
        this.qqResRoot.obBestExResponseDTO.products.filter(p =>
          this.isKeyAvailableInProduct(this.productFilterSelected,p)
        );
      this.onSortChange(this.sortBy);
    }
  }

  investorName(investorId): Investor {
    return this.globalService.investorName(investorId);
  }

  productGrouping(key): ProductGroup {
    return this.globalService.productGroup.get(key);
  }


  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this.router.navigate(['/lockdesk/lock-confirmation/' + this.loanNumber+'/'+this.selectedUserMloUUID ]);
  }

  onSortChange(event) {
    if (this.products) {
      if (event === 'interestRate') {
        this.products.sort(
          firstBy(function (a: Product, b: Product) {
            return a.rate - b.rate;
          }, 1)
            .thenBy('rebate', -1)
            .thenBy('discount', 1)
        );
      } else if (event === 'monthlyPayment') {
        this.products.sort((a: Product, b: Product) =>
          a.principalAndInterest > b.principalAndInterest ? 1 : -1
        );
      } else if (event === 'highInterestRate') {
        this.products.sort(
          firstBy(function (v1: Product, v2: Product) {
            return v1.rate - v2.rate;
          }, -1)
            .thenBy('rebate', 1)
            .thenBy('discount', -1)
        );
      } else if (event === 'lowestapr') {
        this.products.sort(
          firstBy(function (v1: Product, v2: Product) {
            return v1.apr - v2.apr;
          }, 1)
            .thenBy('rebate', -1)
            .thenBy('discount', 1)
        );
      }

    }
  }

  moreInfo(productId: number,moreInfoIndex : number) {
    this.selectedMoreInfoButtonIndex = moreInfoIndex;
    this.globalService.setQQRes(this.qqRes);
    this.router.navigate(['/lockdesk/rate-quote-product-details/' + productId + '/' + this.qqResRoot.quoteId + '/' + this.loanNumber + '/' + this.requestType+'/'+this.selectedUserMloUUID]);
  }
}
