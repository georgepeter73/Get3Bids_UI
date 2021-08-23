import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {MloComponent} from '@modules/admin/page/mlo/mlo.component';
import {MloListComponent} from '@modules/admin/page/mlo-list/mlo-list.component';
import {AuthGuard} from '@app/guard/auth.guard';
import {AdminDashComponent} from '@modules/admin/page/admin-dash/admin-dash.component';
import {UploadMediaComponent} from '@modules/admin/page/upload-media/upload-media.component';
import {MediaListComponent} from '@modules/admin/page/media-list/media-list.component';
import {MloMediaComponent} from '@modules/admin/page/mlo-media/mlo-media.component';


const routes: Routes = [
  {
    path: "",
    component: AdminDashComponent
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
  {
    path: "admin-dash",
    canActivate: [AuthGuard],
    component: AdminDashComponent
  },
  {
    path: "upload-media/:crudType",
    canActivate: [AuthGuard],
    component: UploadMediaComponent
  },

  {
    path: "media-list",
    canActivate: [AuthGuard],
    component: MediaListComponent
  },
  {
    path: "mlo-media",
    canActivate: [AuthGuard],
    component: MloMediaComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
