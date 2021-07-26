import { NgModule } from "@angular/core";

import { SharedModule } from "@shared/shared.module";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./page/admin/admin.component";

@NgModule({
  declarations: [AdminComponent],
  imports: [AdminRoutingModule, SharedModule]
})
export class AdminModule {}
