import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LockDeskService} from '@data/service/lockdesk.service';
import {Location} from '@angular/common';
import {QuickQuoteResults} from '@data/schema/lockdesk/quick-quote-results';
import {QuickQuoteResultsRoot} from '@data/schema/lockdesk/quick-quote-results-root';
import {QuickQuote} from '@data/schema/lockdesk/quick-quote';
import {Product} from '@data/schema/lockdesk/product';
import {ProductDetailRoot} from '@data/schema/lockdesk/product-detail-root';
import {ProductDetail} from '@data/schema/lockdesk/product-detail';
import {Quote} from '@data/schema/lockdesk/quote';
import {TaxonomyItem} from '@data/schema/taxonomy-item';
import {BrokerCompanyInfo} from '@data/schema/company/broker-company-info';
import {BrokerCompanyMedia} from '@data/schema/company/broker-company-media';
import {KeyValuePair} from '@data/schema/lockdesk';
import {UserMLO} from '@data/schema/lockdesk/user-mlo';
import {ProductGroup} from '@data/schema/lockdesk/productgroup';
import {GlobalService} from '@app/service/global.service';
import {Investor} from '@data/schema/lockdesk/investor';
import {firstBy} from 'thenby';

@Component({
  selector: 'app-rate-quote-product',
  templateUrl: './rate-quote-product.component.html',
  styleUrls: ['./rate-quote-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RateQuoteProductComponent implements OnInit {

  constructor(private route: ActivatedRoute, private lockDeskService: LockDeskService, private router: Router,
              private _location: Location, private globalService: GlobalService,) {
  }

  private itemId = '';
  qqRes: QuickQuoteResults;
  qqResRoot: QuickQuoteResultsRoot;
  globalQQ: QuickQuote;
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
  private miTypeShortDesc: string;
  mobileButtonShow = false;
  private errorMessage: string;
  noLoanProducts = false;
  selectedMoreInfoButtonIndex = 0;
  loanTypeList: KeyValuePair[] = [];
  loanTypeSelected: string;
  filteredProductList: Product[];
  loanType: KeyValuePair[] = [];
  creditScoreTypeDesc = 'n/a';
  noPricing: TaxonomyItem;
  pricingFound: TaxonomyItem;
  moreInfoClicked = false;
  userMLO: UserMLO;
  companyUserMLOList: UserMLO[] = [];
  companyLOUUID = '';
  brokerCompanyInfo = new BrokerCompanyInfo();
  // set this to true to test pricing at company, mlo and investor level
  // by default it needs to be false
  priceTesting = false;
  showHelpVideo = true;
  isWholesaleChannel = false;
  isGuidelineDownloaded = false;
  companyLogoMedia = new BrokerCompanyMedia();


  ngOnInit(): void {
    this.loanTypeList = this.globalService.loanTypeList;
    this.itemId = this.route.snapshot.paramMap.get('itemId');
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
      .getQuoteResults(this.itemId)
      .subscribe(
        quickQuoteResultsRoot => {
          this.qqRes = quickQuoteResultsRoot.obBestExResponseDTO;
          this.qqResRoot = quickQuoteResultsRoot;
          if (quickQuoteResultsRoot.obBestExResponseDTO) {
            this.products = quickQuoteResultsRoot.obBestExResponseDTO.products;
            // hack for data not displaying with out a mouse click
            this.eventFire(document.getElementById('refreshButtonId'), 'click');

          } else {
            this.noLoanProducts = true;
          }
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
          this.globalQQ.searchId = this.qqRes.searchId;
          this.globalQQ.quoteId = this.qqResRoot.quoteId;
          this.globalService.setQuickQuote(this.globalQQ);
          this.globalService.setQQRes(this.qqRes);
        },
        err => {
          this.errorMessage = JSON.stringify(err);
          console.log(this.errorMessage);
        }
      );
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
      this.products.forEach(result => {
        this.loanTypeList = this.loanTypeList.filter(keyPair =>
          this.isLoanTypeKeyAvailable(keyPair.key, this.products)
        );
        this.loanTypeSelected = '';
        this.onSortChange(this.sortBy);
      });
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

  filterProductsByLoanType(loanType) {
    if (this.qqResRoot.obBestExResponseDTO.products && this.loanTypeSelected) {
      this.products =
        this.qqResRoot.obBestExResponseDTO.products.filter(
          p => p.loanType === this.loanTypeSelected
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
    this.router.navigate(['/lockdesk/lock-confirmation/' + this.itemId]);
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

  moreInfo(productId: number) {
    this.globalService.setQQRes(this.qqRes);
    this.product = this.qqRes.products.filter(p => p.productId === productId).pop();
    this.router.navigate(['/lockdesk/rate-quote-product-details/' + productId + '/' + this.product.searchId + '/' + this.qqResRoot.quoteId + '/' + this.itemId]);
  }
}