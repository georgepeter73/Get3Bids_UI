import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {QuickpricerParameterComponent} from '@modules/quickpricer/pages/quickpricer-parameter/quickpricer-parameter.component';
import {RateQuoteProductDetailComponent} from '@modules/quickpricer/component/rate-quote-product-detail/rate-quote-product-detail.component';
import {QuickpricerProductComponent} from '@modules/quickpricer/pages/quickpricer-product/quickpricer-product.component';
import {
  QuickpricerProductDetailComponent
} from '@modules/quickpricer/pages/quickpricer-product-detail/quickpricer-product-detail.component';

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
    path: "quickpricer-product",
    component: QuickpricerProductComponent
  },
  {
    path: "quickpricer-product-detail/:productId/:quoteId/:searchId",
    component: QuickpricerProductDetailComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickPricerRoutingModule {}
