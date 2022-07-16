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
import {CompanyMediaComponent} from '@modules/admin/page/company-media/company-media.component';
import {LogSearchSelectedProductComponent} from '@modules/admin/page/log-search-selected-product/log-search-selected-product.component';
import {AdminGuard} from '@app/guard/admin.guard';
import {InvestorMediaComponent} from '@modules/admin/page/investor-media/investor-media.component';


const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard,AdminGuard],
    component: AdminDashComponent
  },
  {
    path: "mlo-create/:crudType/:brokerCompanyId",
    canActivate: [AuthGuard,AdminGuard],
    component: MloComponent
  },
  {
    path: "mlo-list/:brokerCompanyId",
    canActivate: [AuthGuard,AdminGuard],
    component: MloListComponent
  },
  {
    path: "admin-dash",
    canActivate: [AuthGuard,AdminGuard],
    component: AdminDashComponent
  },
  {
    path: "upload-media/:crudType",
    canActivate: [AuthGuard,AdminGuard],
    component: UploadMediaComponent
  },

  {
    path: "media-list",
    canActivate: [AuthGuard,AdminGuard],
    component: MediaListComponent
  },
  {
    path: "mlo-media",
    canActivate: [AuthGuard,AdminGuard],
    component: MloMediaComponent
  },
  {
    path: "investor-pricing",
    canActivate: [AuthGuard,AdminGuard],
    component: InvestorPricingComponent
  },
  {
    path: "investor-new",
    canActivate: [AuthGuard,AdminGuard],
    component: InvestorNewComponent
  },
  {
    path: "mlo-pricing-breakup/:userUUID",
    canActivate: [AuthGuard,AdminGuard],
    component: MloPricingBreakupComponent
  },
  {
    path: "log-search",
    canActivate: [AuthGuard,AdminGuard],
    component: LogSearchComponent
  },
  {
    path: "log-search-detail",
    canActivate: [AuthGuard,AdminGuard],
    component: LogSearchDetailComponent
  },
  {
    path: "company-list",
    canActivate: [AuthGuard,AdminGuard],
    component: CompanyListComponent
  },
  {
    path: "company-new/:mode",
    canActivate: [AuthGuard,AdminGuard],
    component: CompanyNewComponent
  },
  {
    path: "company-users-list/:brokercompanyid",
    canActivate: [AuthGuard,AdminGuard],
    component: CompanyUsersListComponent
  },
  {
    path: "company-pricing-breakup/:companyUUID",
    canActivate: [AuthGuard,AdminGuard],
    component: CompanyPricingBreakupComponent
  },
  {
    path: "company-media",
    canActivate: [AuthGuard,AdminGuard],
    component: CompanyMediaComponent
  },
  {
    path: "log-search-selected-product",
    canActivate: [AuthGuard,AdminGuard],
    component: LogSearchSelectedProductComponent
  },
  {
    path :"investor-media/:channel-type/:ob-investor-id",
    canActivate: [AuthGuard,AdminGuard],
    component : InvestorMediaComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
