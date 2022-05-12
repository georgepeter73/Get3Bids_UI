import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {AuthGuard} from '@app/guard/auth.guard';
import {LockdeskHomeComponent} from '@modules/lockdesk/pages/lockdesk-home/lockdesk-home.component';
import {LoanPipelineComponent} from '@modules/lockdesk/pages/loan-pipeline/loan-pipeline.component';


const routes: Routes = [
  {
    path: "",
    component: LockdeskHomeComponent
  },
  {
    path: "lockdeskhome",
    canActivate: [AuthGuard],
    component: LockdeskHomeComponent
  },
  {
    path: "loan-pipeline",
    canActivate: [AuthGuard],
    component: LoanPipelineComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LockdeskRoutingModule {}
