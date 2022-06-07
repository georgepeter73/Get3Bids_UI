import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LockDeskService} from '@data/service/lockdesk.service';
import {DatePipe, Location} from '@angular/common';
import {GlobalService} from '@app/service/global.service';
import {ProductDetail} from '@data/schema/lockdesk/product-detail';
import {Investor} from '@data/schema/lockdesk/investor';
import {Product, QuickQuoteResults} from '@data/schema/lockdesk';
import {LoanInfo} from '@data/schema/lockdesk/loan-info';
import {Quote} from '@data/schema/lockdesk/quote';
import {LockLoan} from '@data/schema/lockdesk/lock-loan';
import {UserMlo} from '@data/schema/user/user-mlo';

@Component({
  selector: 'app-rate-quote-product-details',
  templateUrl: './rate-quote-product-details.component.html',
  styleUrls: ['./rate-quote-product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RateQuoteProductDetailsComponent implements OnInit {
  selectedMoreInfoButtonIndex: any;
  product: Product;
  qqResRoot: any;
  qqRes: QuickQuoteResults;
  globalQQ: any;
  itemId: string;
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
  productId: string;
  quoteId: string;
  searchId: string;
  priceTesting: any;
  rateIndexSelected: any;
  radioButtonrateSelected: any;
  loading = false;
  requestType : string;
  LockStatusType = {
    float: 101,
    locked: 102,
  };
  LockRequestStatusType = {
    RequestRateLock: 101,
    Locked: 102,
    RequestReLock :103
  };
  private selectedUserMloUUID: string;

  constructor(private route: ActivatedRoute, private lockDeskService: LockDeskService, private router: Router,
              private _location: Location, private globalService: GlobalService,) {
  }

  ngOnInit(): void {

    this.productId = this.route.snapshot.paramMap.get('productId');
    this.quoteId = this.route.snapshot.paramMap.get('quoteId');
    this.searchId = this.route.snapshot.paramMap.get('searchId');
    this.globalQQ = this.globalService.getQuickQuote();
    this.qqRes = this.globalService.getQQRes();
    this.itemId = this.route.snapshot.paramMap.get('itemId');
    this.loanInfo = this.globalService.getRQSelectedLoanInfo();
    this.requestType = this.route.snapshot.paramMap.get('requestType');
    this.selectedUserMloUUID = this.route.snapshot.paramMap.get('selectedUserMloUUID');
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
    this.router.navigate(['/lockdesk/rate-quote-product/' + this.itemId + '/' + this.requestType]);
  }

  requestRateLock() {
    this.isRateLockRequestloading = true;
    this.rateSelected = this.product_detail['quotes'][this.rateIndexSelected];
    this.lockLoan.itemId = this.itemId;
    this.lockLoan.selectedProduct = this.product;
    this.lockLoan.selectedQuote = this.rateSelected;
    this.lockLoan.productDetail = this.product_detail;
    this.lockLoan.adjustments = this.product_detail.adjustments;
    this.lockLoan.lockDays = this.rateSelected.lockPeriod;
    if(this.requestType === this.LockRequestStatusType.RequestRateLock.toString()) {
      this.lockLoan.lockStatus = this.LockStatusType.float;

    }
    if(this.requestType === this.LockRequestStatusType.Locked.toString()) {
      this.lockLoan.lockStatus = this.LockStatusType.locked;

    }
    if(this.requestType === this.LockRequestStatusType.RequestReLock.toString()) {
      this.lockLoan.lockStatus = this.LockStatusType.locked;

    }
    this.lockLoan.lockRequestStatus = parseInt(this.requestType);
    this.lockLoan.loanNumber = this.loanInfo.loanNumber;
    this.lockLoan.loanInfo = this.globalService.getRQSelectedLoanInfo();
    this.lockDeskService.requestRateLock(this.lockLoan).subscribe(ll => {

        this.lockLoan = ll;

        this.isRateLockRequestloading = false;
        this.isRateLockRequestComplete = true;
        this.isRateLockRequestFailed = false;
        // hack for data not displaying with out a mouse click
        this.eventFire(document.getElementById('refreshButtonId'), 'click');
        setTimeout(()=>{
          this.router.navigate(['/lockdesk/lock-confirmation/' + this.itemId+'/'+this.selectedUserMloUUID]);
        }, 3000);

      }, error => {
        this.isRateLockRequestloading = false;
        this.isRateLockRequestComplete = false;
        this.isRateLockRequestFailed = true;
        console.log(error)
      }
    );


  }

  onRateLockFilterSelect() {

  }
}
