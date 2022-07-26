import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {QuickpricerParameterComponent} from '@modules/quickpricer/pages/quickpricer-parameter/quickpricer-parameter.component';
import {RateQuoteProductComponent} from '@modules/quickpricer/pages/rate-quote-product/rate-quote-product.component';
import {RateQuoteProductDetailComponent} from '@modules/quickpricer/pages/rate-quote-product-detail/rate-quote-product-detail.component';

const routes: Routes = [
  {
    path: "",
     component: QuickpricerParameterComponent
  },
  {
    path: "params",
    component: QuickpricerParameterComponent
  },
  {
    path: "rate-quote-product",
    component: RateQuoteProductComponent
  },
  {
    path: "rate-quote-product-detail",
    component: RateQuoteProductDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickPricerRoutingModule {}
