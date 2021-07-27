import { NgModule } from "@angular/core";

import { SharedModule } from "@shared/shared.module";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./page/admin/admin.component";
import {NbCardModule, NbRouteTabsetModule, NbTabsetModule} from '@nebular/theme';

@NgModule({
  declarations: [AdminComponent],
  imports: [AdminRoutingModule, SharedModule, NbRouteTabsetModule, NbCardModule, NbTabsetModule]
})
export class AdminModule {}
