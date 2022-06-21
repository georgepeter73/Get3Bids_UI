import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {AuthGuard} from '@app/guard/auth.guard';
import {LockdeskHomeComponent} from '@modules/lockdesk/pages/lockdesk-home/lockdesk-home.component';
import {LoanPipelineComponent} from '@modules/lockdesk/pages/loan-pipeline/loan-pipeline.component';
import {LockConfirmationComponent} from '@modules/lockdesk/pages/lock-confirmation/lock-confirmation.component';
import {RateQuoteProductComponent} from '@modules/lockdesk/pages/rate-quote-product/rate-quote-product.component';
import {RateQuoteProductDetailsComponent} from '@modules/lockdesk/pages/rate-quote-product-details/rate-quote-product-details.component';
import {LockLoanPipelineComponent} from '@modules/lockdesk/pages/lock-loan-pipeline/lock-loan-pipeline.component';
import {LockDeskGuard} from '@app/guard/lockdesk.guard';


const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard,LockDeskGuard],
    component: LockdeskHomeComponent
  },
  {
    path: "lockdeskhome",
    canActivate: [AuthGuard,LockDeskGuard],
    component: LockdeskHomeComponent
  },
  {
    path: "loan-pipeline",
    canActivate: [AuthGuard,LockDeskGuard],
    component: LoanPipelineComponent
  },
  {
    path: "lock-loan-pipeline",
    canActivate: [AuthGuard,LockDeskGuard],
    component: LockLoanPipelineComponent
  },
  {
    path: "lock-confirmation/:itemId/:selectedUserMloUUID",
    canActivate: [AuthGuard,LockDeskGuard],
    component: LockConfirmationComponent
  },
  {
    path: "rate-quote-product/:itemId/:requestType/:selectedUserMloUUID",
    canActivate: [AuthGuard,LockDeskGuard],
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
