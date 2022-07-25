import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickpricerParameterComponent } from './pages/quickpricer-parameter/quickpricer-parameter.component';
import {QuickPricerRoutingModule} from '@modules/quickpricer/quickpricer-routing.module';
import {SharedModule} from '@shared/shared.module';
import {NbCheckboxModule, NbIconModule, NbInputModule, NbSelectModule} from '@nebular/theme';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {AutocompleteComponent} from '@modules/quickpricer/component/google-places.component';



@NgModule({
  declarations: [QuickpricerParameterComponent, AutocompleteComponent],
  imports: [
    CommonModule, QuickPricerRoutingModule, SharedModule, NbIconModule, NbInputModule, NbCheckboxModule, NbSelectModule
  ],
  providers: [QuickQuoteService],
})
export class QuickpricerModule { }
