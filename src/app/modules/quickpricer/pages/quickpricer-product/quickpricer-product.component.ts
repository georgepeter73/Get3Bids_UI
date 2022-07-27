import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {QuickQuoteResultsRoot} from '@data/schema/lockdesk/quick-quote-results-root';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {TaxonomyService} from '@data/service/taxonomy.service';
import {GlobalService} from '@app/service/global.service';
import {QuickpricingService} from '@data/service/quickpricing.service';
import {QuickQuote} from '@data/schema/lockdesk';

@Component({
  selector: 'app-quickpricer-product',
  templateUrl: './quickpricer-product.component.html',
  styleUrls: ['./quickpricer-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class QuickpricerProductComponent implements OnInit {

  constructor(private router: Router,
              private _location: Location,
              private taxonomyService: TaxonomyService,
              private  globalService: GlobalService,
              private quickPricerService : QuickpricingService,

  ) {
  }
  quoteResultsRoot : QuickQuoteResultsRoot;
  productLoading=false;
  productDetailRoute = "/quickpricer/rate-quote-product-detail/";
   ngOnInit(): void {
   this.globalService.getQuickQuote().subscribe(qq=>{
      this.getProducts(qq);
    })

  }
  getProducts(qq : QuickQuote){
     this.productLoading = true;
    this.quickPricerService.getQuoteResults(qq).subscribe(result =>{
      this.quoteResultsRoot = result;
      this.productLoading = false;
      this.emitClickEvent();

    })
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
  refreshGrid($event: MouseEvent) {
    $event.preventDefault();

  }

  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this.router.navigate(['/quickpricer/params'])
  }
}
