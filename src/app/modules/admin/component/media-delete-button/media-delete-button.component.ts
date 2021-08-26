import { Component,  ChangeDetectionStrategy } from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {ICellRendererParams} from 'ag-grid-community';
import {ICellRendererAngularComp} from '@ag-grid-community/angular';
import {QuickQuoteService} from '@data/service/quickquote.service';
import { LoanHouseEventService} from '@data/service/loanhouse-event-service';

@Component({
  selector: 'app-media-delete-button',
  templateUrl: './media-delete-button.component.html',
  styleUrls: ['./media-delete-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MediaDeleteButtonComponent implements  ICellRendererAngularComp {
  params: any;
  buttonLoading: any;
  video = faTrash;
  private cellValue: string;
  constructor(public quickQuoteService : QuickQuoteService, public lheventServices : LoanHouseEventService) {
  }

  agInit(params: any): void {
    this.cellValue = this.getValueToDisplay(params);
    this.params = params;
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

  refresh(): boolean {
    return true;
  }
  buttonClicked() {
       this.quickQuoteService.deleteMediaLocation(this.params.value).subscribe(d =>{
          this.lheventServices.emitRowDeleteCompletedEvent(true);
      })
  }
}
