import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { AdminRoutingModule } from "./admin-routing.module";
import {
    NbAccordionModule, NbActionsModule, NbAlertModule, NbButtonModule,
    NbCardModule,
    NbCheckboxModule, NbIconModule, NbInputModule,
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



@NgModule({
  declarations: [ MloComponent, MloListComponent, AdminDashComponent, UploadMediaComponent, MediaListComponent],
  imports: [AgGridModule.withComponents([]), AdminRoutingModule, SharedModule, NbRouteTabsetModule, NbCardModule, NbTabsetModule, NbAccordionModule, NbRadioModule, NbCheckboxModule, NbSelectModule, NbInputModule, NbButtonModule, NbSpinnerModule, NbAlertModule, NbActionsModule, NbTooltipModule, NbIconModule, MatProgressBarModule],
  providers: [QuickQuoteService]
})
export class AdminModule {}
