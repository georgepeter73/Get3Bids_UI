import { NgModule } from "@angular/core";

import { SharedModule } from "@shared/shared.module";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./page/admin/admin.component";
import {
  NbAccordionModule, NbButtonModule,
  NbCardModule,
  NbCheckboxModule, NbInputModule,
  NbRadioModule,
  NbRouteTabsetModule,
  NbSelectModule,
  NbTabsetModule
} from '@nebular/theme';
import { MloComponent } from './page/mlo/mlo.component';
import { MloListComponent } from './page/mlo-list/mlo-list.component';

@NgModule({
  declarations: [AdminComponent, MloComponent, MloListComponent],
  imports: [AdminRoutingModule, SharedModule, NbRouteTabsetModule, NbCardModule, NbTabsetModule, NbAccordionModule, NbRadioModule, NbCheckboxModule, NbSelectModule, NbInputModule, NbButtonModule]
})
export class AdminModule {}
