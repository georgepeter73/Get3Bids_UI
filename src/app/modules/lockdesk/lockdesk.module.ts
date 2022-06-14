import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LockdeskHomeComponent } from './pages/lockdesk-home/lockdesk-home.component';
import { LockdeskRoutingModule } from './lockdesk-routing.module';
import {SharedModule} from '@shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
    NbAlertModule,
    NbButtonModule,
    NbDialogService,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbSpinnerModule
} from '@nebular/theme';
import { LoanPipelineComponent } from './pages/loan-pipeline/loan-pipeline.component';
import {AgGridModule} from '@ag-grid-community/angular';
import {LockDeskService} from '@data/service/lockdesk.service';
import { LockConfirmationComponent } from './pages/lock-confirmation/lock-confirmation.component';
import { RateQuoteProductComponent } from './pages/rate-quote-product/rate-quote-product.component';
import {RatingModule} from 'ng-starrating';
import { RateQuoteProductDetailsComponent } from './pages/rate-quote-product-details/rate-quote-product-details.component';
import {QuickQuoteService} from '@data/service/quickquote.service';
import { LockLoanPipelineComponent } from './pages/lock-loan-pipeline/lock-loan-pipeline.component';

@NgModule({
  declarations: [LockdeskHomeComponent, LoanPipelineComponent, LockConfirmationComponent, RateQuoteProductComponent, RateQuoteProductDetailsComponent, LockLoanPipelineComponent],
    imports: [
        CommonModule, LockdeskRoutingModule, SharedModule, NbButtonModule, AgGridModule.forRoot(), NbInputModule, NbIconModule, NbSpinnerModule, NbSelectModule, RatingModule, NbRadioModule, NbAlertModule, NgbModule
    ],
  providers: [LockDeskService,QuickQuoteService],
})
export class LockdeskModule { }
