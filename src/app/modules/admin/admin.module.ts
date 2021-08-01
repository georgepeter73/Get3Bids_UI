import { NgModule } from "@angular/core";

import { SharedModule } from "@shared/shared.module";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./page/admin/admin.component";
import {
  NbAccordionModule, NbActionsModule, NbAlertModule, NbButtonModule,
  NbCardModule,
  NbCheckboxModule, NbInputModule,
  NbRadioModule,
  NbRouteTabsetModule,
  NbSelectModule, NbSpinnerModule,
  NbTabsetModule, NbTooltipModule
} from '@nebular/theme';
import { MloComponent } from './page/mlo/mlo.component';
import { MloListComponent } from './page/mlo-list/mlo-list.component';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {AgGridModule} from '@ag-grid-community/angular';

@NgModule({
  declarations: [AdminComponent, MloComponent, MloListComponent],
  imports: [AgGridModule.withComponents([]), AdminRoutingModule, SharedModule, NbRouteTabsetModule, NbCardModule, NbTabsetModule, NbAccordionModule, NbRadioModule, NbCheckboxModule, NbSelectModule, NbInputModule, NbButtonModule, NbSpinnerModule, NbAlertModule, NbActionsModule, NbTooltipModule],
  providers: [QuickQuoteService]
})
export class AdminModule {}
