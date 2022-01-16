import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {MloComponent} from '@modules/admin/page/mlo/mlo.component';
import {MloListComponent} from '@modules/admin/page/mlo-list/mlo-list.component';
import {AuthGuard} from '@app/guard/auth.guard';
import {AdminDashComponent} from '@modules/admin/page/admin-dash/admin-dash.component';
import {UploadMediaComponent} from '@modules/admin/page/upload-media/upload-media.component';
import {MediaListComponent} from '@modules/admin/page/media-list/media-list.component';
import {MloMediaComponent} from '@modules/admin/page/mlo-media/mlo-media.component';
import {InvestorPricingComponent} from '@modules/admin/page/investor-pricing/investor-pricing.component';
import {InvestorNewComponent} from '@modules/admin/page/investor-new/investor-new.component';
import {MloPricingBreakupComponent} from '@modules/admin/page/mlo-pricing-breakup/mlo-pricing-breakup.component';
import {LogSearchComponent} from '@modules/admin/page/log-search/log-search.component';
import {LogSearchDetailComponent} from '@modules/admin/page/log-search-detail/log-search-detail.component';
import {CompanyListComponent} from '@modules/admin/page/company-list/company-list.component';
import {CompanyNewComponent} from '@modules/admin/page/company-new/company-new.component';
import {CompanyUsersListComponent} from '@modules/admin/page/company-users-list/company-users-list.component';
import {CompanyPricingBreakupComponent} from '@modules/admin/page/company-pricing-breakup/company-pricing-breakup.component';


const routes: Routes = [
  {
    path: "",
    component: AdminDashComponent
  },
  {
    path: "mlo-create/:crudType",
    canActivate: [AuthGuard],
    component: MloComponent
  },
  {
    path: "mlo-list",
    canActivate: [AuthGuard],
    component: MloListComponent
  },
  {
    path: "admin-dash",
    canActivate: [AuthGuard],
    component: AdminDashComponent
  },
  {
    path: "upload-media/:crudType",
    canActivate: [AuthGuard],
    component: UploadMediaComponent
  },

  {
    path: "media-list",
    canActivate: [AuthGuard],
    component: MediaListComponent
  },
  {
    path: "mlo-media",
    canActivate: [AuthGuard],
    component: MloMediaComponent
  },
  {
    path: "investor-pricing",
    canActivate: [AuthGuard],
    component: InvestorPricingComponent
  },
  {
    path: "investor-new",
    canActivate: [AuthGuard],
    component: InvestorNewComponent
  },
  {
    path: "mlo-pricing-breakup/:userUUID",
    canActivate: [AuthGuard],
    component: MloPricingBreakupComponent
  },
  {
    path: "log-search",
    canActivate: [AuthGuard],
    component: LogSearchComponent
  },
  {
    path: "log-search-detail",
    canActivate: [AuthGuard],
    component: LogSearchDetailComponent
  },
  {
    path: "company-list",
    canActivate: [AuthGuard],
    component: CompanyListComponent
  },
  {
    path: "company-new/:mode",
    canActivate: [AuthGuard],
    component: CompanyNewComponent
  },
  {
    path: "company-users-list/:brokercompanyid",
    canActivate: [AuthGuard],
    component: CompanyUsersListComponent
  },
  {
    path: "company-pricing-breakup/:companyUUID",
    canActivate: [AuthGuard],
    component: CompanyPricingBreakupComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
