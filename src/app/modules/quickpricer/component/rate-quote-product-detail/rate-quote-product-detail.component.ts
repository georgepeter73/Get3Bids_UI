import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LockDeskService} from '@data/service/lockdesk.service';
import {DatePipe, Location} from '@angular/common';
import {GlobalService} from '@app/service/global.service';
import {Product, QuickQuoteResults} from '@data/schema/lockdesk';
import {ProductDetail} from '@data/schema/lockdesk/product-detail';
import {UserMlo} from '@data/schema/user/user-mlo';
import {LoanInfo} from '@data/schema/lockdesk/loan-info';
import {Quote} from '@data/schema/lockdesk/quote';
import {LockLoan} from '@data/schema/lockdesk/lock-loan';
import {Investor} from '@data/schema/lockdesk/investor';

@Component({
  selector: 'app-rate-quote-product-detail',
  templateUrl: './rate-quote-product-detail.component.html',
  styleUrls: ['./rate-quote-product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RateQuoteProductDetailComponent implements OnInit {

  selectedMoreInfoButtonIndex: any;
  product: Product;
  qqResRoot: any;
  qqRes: QuickQuoteResults;
  globalQQ: any;
  loanNumber: string;
  mobileButtonShow: boolean;
  moreInfoClicked: boolean;
  product_detail: ProductDetail;
  userMLO: UserMlo;
  rateLockFilterList: { value: string; key: string }[];
  rateLockFilterSelected: string;
  loanInfo: LoanInfo;
  errorMessage: string;
  rateSelected: Quote;
  lockLoan = new LockLoan();
  isRateLockRequestloading = false;
  isRateLockRequestComplete = false;
  isRateLockRequestFailed = false;
  priceTesting: any;
  rateIndexSelected: any;
  radioButtonrateSelected: any;
  loading = false;
  requestType : string;
  LockStatusType = {
    float: 101,
    locked: 102,
  };
  LockStates = {
    RequestRateLock: 101,
    Locked: 102,
    RequestReLock :103
  };
  @Input() productId : string;
  @Input() quoteId : string;
  @Input() searchId : string;

  constructor(private route: ActivatedRoute, private lockDeskService: LockDeskService, private router: Router,
              private _location: Location, private globalService: GlobalService,) {
  }

  ngOnInit(): void {

    this.qqRes = this.globalService.getQQRes();
    this.moreInfo();
  }

  moreInfo() {
    const pipe = new DatePipe('en-US');
    this.mobileButtonShow = false;
    this.loading = true;
    this.moreInfoClicked = true;
    this.product = this.qqRes.products.filter(p => p.productId === parseInt(this.productId)).pop();
    this.lockDeskService
      .getProductDetails(this.productId, this.product.searchId, this.product.quoteId.toString())
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


  onSelectRate($event: any) {
    this.radioButtonrateSelected = true;

  }

  isCompany() {
    return false;
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
    this.router.navigate(['/quickpricer/quickpricer-product']);
  }


  onRateLockFilterSelect() {

  }

}
