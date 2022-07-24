import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickpricerParameterComponent } from './pages/quickpricer-parameter/quickpricer-parameter.component';
import {QuickPricerRoutingModule} from '@modules/quickpricer/quickpricer-routing.module';
import {SharedModule} from '@shared/shared.module';
import {NbIconModule, NbInputModule} from '@nebular/theme';



@NgModule({
  declarations: [QuickpricerParameterComponent],
  imports: [
    CommonModule, QuickPricerRoutingModule, SharedModule, NbIconModule, NbInputModule
  ]
})
export class QuickpricerModule { }
