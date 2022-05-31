import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LockdeskHomeComponent } from './pages/lockdesk-home/lockdesk-home.component';
import { LockdeskRoutingModule } from './lockdesk-routing.module';
import {SharedModule} from '@shared/shared.module';
import {NbButtonModule, NbDialogService, NbIconModule, NbInputModule, NbSpinnerModule} from '@nebular/theme';
import { LoanPipelineComponent } from './pages/loan-pipeline/loan-pipeline.component';
import {AgGridModule} from '@ag-grid-community/angular';
import {LockDeskService} from '@data/service/lockdesk.service';
import { LockConfirmationComponent } from './pages/lock-confirmation/lock-confirmation.component';

@NgModule({
  declarations: [LockdeskHomeComponent, LoanPipelineComponent, LockConfirmationComponent],
    imports: [
        CommonModule, LockdeskRoutingModule, SharedModule, NbButtonModule, AgGridModule.forRoot(), NbInputModule, NbIconModule, NbSpinnerModule
    ],
  providers: [LockDeskService],
})
export class LockdeskModule { }
