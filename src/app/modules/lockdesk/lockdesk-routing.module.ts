import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {AuthGuard} from '@app/guard/auth.guard';
import {LockdeskHomeComponent} from '@modules/lockdesk/pages/lockdesk-home/lockdesk-home.component';
import {LoanPipelineComponent} from '@modules/lockdesk/pages/loan-pipeline/loan-pipeline.component';
import {LockConfirmationComponent} from '@modules/lockdesk/pages/lock-confirmation/lock-confirmation.component';
import {RateQuoteProductComponent} from '@modules/lockdesk/pages/rate-quote-product/rate-quote-product.component';


const routes: Routes = [
  {
    path: "",
    component: LockdeskHomeComponent
  },
  {
    path: "lockdeskhome",
    canActivate: [AuthGuard],
    component: LockdeskHomeComponent
  },
  {
    path: "loan-pipeline",
    canActivate: [AuthGuard],
    component: LoanPipelineComponent
  },
  {
    path: "lock-confirmation/:itemId",
    canActivate: [AuthGuard],
    component: LockConfirmationComponent
  },
  {
    path: "rate-quote-product/:itemId",
    canActivate: [AuthGuard],
    component: RateQuoteProductComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LockdeskRoutingModule {}
