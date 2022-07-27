import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickpricerParameterComponent } from './pages/quickpricer-parameter/quickpricer-parameter.component';
import {QuickPricerRoutingModule} from '@modules/quickpricer/quickpricer-routing.module';
import {SharedModule} from '@shared/shared.module';
import {NbButtonModule, NbCheckboxModule, NbIconModule, NbInputModule, NbSelectModule, NbSpinnerModule} from '@nebular/theme';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {AutocompleteComponent} from '@modules/quickpricer/component/google-places.component';
import { RateQuoteProductComponent } from './component/rate-quote-product/rate-quote-product.component';
import { RateQuoteProductDetailComponent } from './pages/rate-quote-product-detail/rate-quote-product-detail.component';
import {RatingModule} from 'ng-starrating';
import {QuickpricingService} from '@data/service/quickpricing.service';
import { QuickpricerProductComponent } from './pages/quickpricer-product/quickpricer-product.component';




@NgModule({
  declarations: [QuickpricerParameterComponent, AutocompleteComponent, RateQuoteProductComponent, RateQuoteProductDetailComponent, QuickpricerProductComponent],
  imports: [
    CommonModule, QuickPricerRoutingModule, SharedModule, NbIconModule,
    NbInputModule, NbCheckboxModule, NbSelectModule, NbButtonModule, RatingModule, NbSpinnerModule,
  ],
  providers: [QuickQuoteService, QuickpricingService],
})
export class QuickpricerModule { }
