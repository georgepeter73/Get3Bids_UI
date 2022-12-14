import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { AdminRoutingModule } from "./admin-routing.module";
import {
  NbAccordionModule, NbActionsModule, NbAlertModule, NbButtonModule,
  NbCardModule,
  NbCheckboxModule, NbDialogModule, NbDialogService, NbIconModule, NbInputModule,
  NbRadioModule,
  NbRouteTabsetModule,
  NbSelectModule, NbSpinnerModule,
  NbTabsetModule, NbTooltipModule
} from '@nebular/theme';
import { MloComponent } from './page/mlo/mlo.component';
import { MloListComponent } from './page/mlo-list/mlo-list.component';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {AgGridModule} from '@ag-grid-community/angular';
import { AdminDashComponent } from './page/admin-dash/admin-dash.component';
import { UploadMediaComponent } from './page/upload-media/upload-media.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MediaListComponent } from './page/media-list/media-list.component';
import { MediaShowButtonComponent } from './component/media-show-button/media-show-button.component';
import { MediaDialogComponent } from './component/media-dialog/media-dialog.component';
import { MloMediaComponent } from './page/mlo-media/mlo-media.component';
import { MediaDeleteButtonComponent } from './component/media-delete-button/media-delete-button.component';
import {LoanHouseEventService} from '@data/service/loanhouse-event-service';
import { InvestorPricingComponent } from './page/investor-pricing/investor-pricing.component';
import { InvestorNewComponent } from './page/investor-new/investor-new.component';
import { MloPricingBreakupComponent } from './page/mlo-pricing-breakup/mlo-pricing-breakup.component';
import { LogSearchComponent } from './page/log-search/log-search.component';
import { LogSearchDetailComponent } from './page/log-search-detail/log-search-detail.component';
import { CompanyListComponent } from './page/company-list/company-list.component';
import { CompanyNewComponent } from './page/company-new/company-new.component';
import { CompanyUsersListComponent } from './page/company-users-list/company-users-list.component';
import { CompanyPricingBreakupComponent } from './page/company-pricing-breakup/company-pricing-breakup.component';
import { CompanyMediaComponent } from './page/company-media/company-media.component';
import { LogSearchSelectedProductComponent } from './page/log-search-selected-product/log-search-selected-product.component';
import { InvestorMediaComponent } from './page/investor-media/investor-media.component';

@NgModule({
  entryComponents :[MediaDialogComponent],
  declarations: [ MloComponent, MloListComponent, AdminDashComponent, UploadMediaComponent, MediaListComponent, MediaShowButtonComponent, MediaDialogComponent, MloMediaComponent, MediaDeleteButtonComponent, InvestorPricingComponent, InvestorNewComponent, MloPricingBreakupComponent, LogSearchComponent, LogSearchDetailComponent, CompanyListComponent, CompanyNewComponent, CompanyUsersListComponent, CompanyPricingBreakupComponent, CompanyMediaComponent, LogSearchSelectedProductComponent, InvestorMediaComponent],
  imports: [AgGridModule.withComponents([MediaShowButtonComponent,MediaDeleteButtonComponent]), AdminRoutingModule, SharedModule, NbRouteTabsetModule, NbCardModule, NbTabsetModule, NbAccordionModule,
    NbRadioModule, NbCheckboxModule, NbSelectModule, NbInputModule, NbButtonModule, NbSpinnerModule, NbAlertModule, NbActionsModule, NbTooltipModule,
    NbIconModule, MatProgressBarModule, NbDialogModule.forRoot()],
  providers: [QuickQuoteService, NbDialogService, LoanHouseEventService]
})
export class AdminModule {}
