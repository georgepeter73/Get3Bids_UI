import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@app/guard/auth.guard';
import {NgModule} from '@angular/core';
import {QuickpricerParameterComponent} from '@modules/quickpricer/pages/quickpricer-parameter/quickpricer-parameter.component';

const routes: Routes = [
  {
    path: "",
     component: QuickpricerParameterComponent
  },
  {
    path: "params",
    component: QuickpricerParameterComponent
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickPricerRoutingModule {}
