import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HomeRoutingModule} from './home-routing.module'
import {SharedModule} from '../../shared/shared.module'



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule, HomeRoutingModule, SharedModule
  ]
})
export class HomeModule { }
