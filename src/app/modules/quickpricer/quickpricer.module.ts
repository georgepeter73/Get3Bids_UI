import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickpricerParameterComponent } from './pages/quickpricer-parameter/quickpricer-parameter.component';
import {QuickPricerRoutingModule} from '@modules/quickpricer/quickpricer-routing.module';
import {SharedModule} from '@shared/shared.module';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule, NbRadioModule,
  NbSelectModule,
  NbSpinnerModule
} from '@nebular/theme';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {AutocompleteComponent} from '@modules/quickpricer/component/google-places.component';
import { RateQuoteProductComponent } from './component/rate-quote-product/rate-quote-product.component';
import { RateQuoteProductDetailComponent } from './component/rate-quote-product-detail/rate-quote-product-detail.component';
import {RatingModule} from 'ng-starrating';
import {QuickpricingService} from '@data/service/quickpricing.service';
import { QuickpricerProductComponent } from './pages/quickpricer-product/quickpricer-product.component';
import {LockDeskService} from '@data/service/lockdesk.service';
import { QuickpricerProductDetailComponent } from './pages/quickpricer-product-detail/quickpricer-product-detail.component';




@NgModule({
  declarations: [QuickpricerParameterComponent, AutocompleteComponent, RateQuoteProductComponent, RateQuoteProductDetailComponent, QuickpricerProductComponent, QuickpricerProductDetailComponent],
  imports: [
    CommonModule, QuickPricerRoutingModule, SharedModule, NbIconModule,
    NbInputModule, NbCheckboxModule, NbSelectModule, NbButtonModule, RatingModule, NbSpinnerModule, NbAlertModule, NbRadioModule,
  ],
  providers: [QuickQuoteService, QuickpricingService,LockDeskService],
})
export class QuickpricerModule { }
