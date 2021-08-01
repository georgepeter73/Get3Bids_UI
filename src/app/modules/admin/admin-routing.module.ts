import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {MloComponent} from '@modules/admin/page/mlo/mlo.component';
import {MloListComponent} from '@modules/admin/page/mlo-list/mlo-list.component';
import {AuthGuard} from '@app/guard/auth.guard';


const routes: Routes = [
  {
    path: "",
    component: MloListComponent
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

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
