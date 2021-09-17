import {ChangeDetectionStrategy, Component} from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import {faVideo,faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import {ICellRendererParams} from 'ag-grid-community';
import {NbDialogService} from '@nebular/theme';
import {MediaDialogComponent} from '@modules/admin/component/media-dialog/media-dialog.component';
@Component({
  selector: "media-show-button",
  templateUrl: './media-show-button.component.html',
  styleUrls: ['./media-show-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MediaShowButtonComponent implements ICellRendererAngularComp {
   params: any;
  buttonLoading: any;
  video = faVideo;
  private cellValue: string;
  constructor(private dialogService: NbDialogService) {
  }

  agInit(params: any): void {
    this.cellValue = this.getValueToDisplay(params);
    this.params = params;
    if(this.isVideoFormat()){
      this.video = faVideo;

    }else {
      this.video = faCameraRetro;
    }
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

  refresh(): boolean {
    return false;
  }
  buttonClicked(){
     this.open();
  }
  open() {
    this.dialogService.open(MediaDialogComponent, {
      context: {
        title: 'Preview Window',
        videoURL : this.params.value,
      },
    });


  }
  isVideoFormat() : boolean{
    if(this.params.value.includes("mp4") || this.params.value.includes("mp3")){
      return true
    }
  }
}
