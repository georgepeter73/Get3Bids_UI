import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {AuthGuard} from '@app/guard/auth.guard';
import {LockdeskHomeComponent} from '@modules/lockdesk/pages/lockdesk-home/lockdesk-home.component';
import {LoanPipelineComponent} from '@modules/lockdesk/pages/loan-pipeline/loan-pipeline.component';
import {LockConfirmationComponent} from '@modules/lockdesk/pages/lock-confirmation/lock-confirmation.component';
import {RateQuoteProductComponent} from '@modules/lockdesk/pages/rate-quote-product/rate-quote-product.component';
import {RateQuoteProductDetailsComponent} from '@modules/lockdesk/pages/rate-quote-product-details/rate-quote-product-details.component';
import {LockLoanPipelineComponent} from '@modules/lockdesk/pages/lock-loan-pipeline/lock-loan-pipeline.component';


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
    path: "lock-loan-pipeline",
    canActivate: [AuthGuard],
    component: LockLoanPipelineComponent
  },
  {
    path: "lock-confirmation/:itemId/:selectedUserMloUUID",
    canActivate: [AuthGuard],
    component: LockConfirmationComponent
  },
  {
    path: "rate-quote-product/:itemId/:requestType/:selectedUserMloUUID",
    canActivate: [AuthGuard],
    component: RateQuoteProductComponent
  },
  {
    path: "rate-quote-product-details/:productId/:quoteId/:itemId/:requestType/:selectedUserMloUUID",
    canActivate: [AuthGuard],
    component: RateQuoteProductDetailsComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LockdeskRoutingModule {}
