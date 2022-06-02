import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LockDeskService} from '@data/service/lockdesk.service';
import {DatePipe, Location} from '@angular/common';
import {GlobalService} from '@app/service/global.service';
import {ProductDetail} from '@data/schema/lockdesk/product-detail';
import {UserMLO} from '@data/schema/lockdesk/user-mlo';
import {Investor} from '@data/schema/lockdesk/investor';
import {QuickQuoteResults} from '@data/schema/lockdesk';
import {LoanInfo} from '@data/schema/lockdesk/loan-info';

@Component({
  selector: 'app-rate-quote-product-details',
  templateUrl: './rate-quote-product-details.component.html',
  styleUrls: ['./rate-quote-product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RateQuoteProductDetailsComponent implements OnInit {
  selectedMoreInfoButtonIndex: any;
  product: any;
  qqResRoot: any;
  qqRes: QuickQuoteResults;
  globalQQ: any;
  itemId: string;
  mobileButtonShow: boolean;
  moreInfoClicked: boolean;
  product_detail: ProductDetail;
  userMLO: UserMLO;
  rateLockFilterList: { value: string; key: string }[];
  rateLockFilterSelected: string;
  loanInfo : LoanInfo;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private lockDeskService: LockDeskService, private router: Router,
              private _location: Location, private globalService: GlobalService,) {
  }

  productId: string;
  quoteId: string;
  searchId: string;
  priceTesting: any;
  rateIndexSelected: any;
  radioButtonrateSelected: any;
  loading  = false;

  ngOnInit(): void {

    this.productId = this.route.snapshot.paramMap.get('productId');
    this.quoteId = this.route.snapshot.paramMap.get('quoteId');
    this.searchId = this.route.snapshot.paramMap.get('searchId');
    this.globalQQ = this.globalService.getQuickQuote();
    this.qqRes = this.globalService.getQQRes();
    this.itemId = this.route.snapshot.paramMap.get('itemId');
    this.loanInfo = this.globalService.getRQSelectedLoanInfo();
    this.moreInfo();
  }

  moreInfo() {
    const pipe = new DatePipe('en-US');
    this.mobileButtonShow = false;
    this.loading = true;
    this.moreInfoClicked = true;
    this.product = this.qqRes.products.filter(p => p.productId === parseInt(this.productId)).pop();
    this.lockDeskService
      .getProductDetails(this.productId, this.product.searchId, this.quoteId)
      .subscribe(
        productDetailRoot => {
          if (productDetailRoot.success) {
            this.product_detail = productDetailRoot.product_detail;
            this.loading = false;
            // hack for data not displaying with out a mouse click
            this.eventFire(document.getElementById('refreshButtonId'), 'click');
            this.userMLO = productDetailRoot.userMLO;
            this.rateLockFilterList = this.product_detail.quotes.map(quote => ({
              key: String(quote.lockPeriod),
              value:
                quote.lockPeriod +
                ' Rate Lock Protection Expiring on ' +
                pipe.transform(
                  new Date(quote.lockExpirationDate),
                  'MMMM d, yyyy'
                )
            }));
            this.rateLockFilterList = this.rateLockFilterList.filter(
              (item, index, list) =>
                index === list.findIndex(findItem => findItem.key === item.key)
            );
            this.rateLockFilterSelected =
              this.rateLockFilterList.length > 1
                ? this.rateLockFilterList[1].key
                : this.rateLockFilterList[0].key;

          } else {

            console.log('Product detail call failed');
            console.log('Result : ' + JSON.stringify(productDetailRoot));
          }
          this.selectedMoreInfoButtonIndex = -1;
        },
        err => {
          this.errorMessage = JSON.stringify(err);
          console.log(this.errorMessage);
          this.selectedMoreInfoButtonIndex = -1;
        }
      );
  }

  investorName(investorId): Investor {
    return this.globalService.investorName(investorId);
  }

  onRateLockFilterSelect() {

  }

  onSelectRate($event: any) {

  }

  isCompany() {
    return false;
  }

  startLoanApplication($event: MouseEvent, borrowerInfoPopup: any, newloanmessage: any, newloanmessage1: any, ref: any) {

  }

  refreshGrid($event: MouseEvent) {
    $event.preventDefault();

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

  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this.router.navigate(['/lockdesk/rate-quote-product/' + this.itemId]);
  }
}
