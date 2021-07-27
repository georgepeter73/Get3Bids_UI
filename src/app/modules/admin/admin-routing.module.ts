import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./page/admin/admin.component";
import {MloComponent} from '@modules/admin/page/mlo/mlo.component';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
