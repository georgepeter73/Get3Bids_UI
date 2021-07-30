import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./page/admin/admin.component";
import {MloComponent} from '@modules/admin/page/mlo/mlo.component';
import {MloListComponent} from '@modules/admin/page/mlo-list/mlo-list.component';


const routes: Routes = [
  {
    path: "",
    component: AdminComponent
  },
  {
    path: "mlo-create",
    component: MloComponent
  },
  {
    path: "mlo-list",
    component: MloListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
