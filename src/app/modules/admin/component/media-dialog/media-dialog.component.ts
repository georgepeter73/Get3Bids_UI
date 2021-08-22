import {Component, OnInit,  Input} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-media-dialog',
  templateUrl: './media-dialog.component.html',
  styleUrls: ['./media-dialog.component.scss'],

})
export class MediaDialogComponent  {
  @Input() title: string;
  @Input() videoURL: string = '';
  play = false;

  constructor(protected ref: NbDialogRef<MediaDialogComponent>,  protected _sanitizer: DomSanitizer,) {}

  dismiss() {
    this.ref.close();
  }

  playVideo() {
    let vid = <HTMLVideoElement>document.getElementById('myVideo');
    if (vid && this.play) {
      vid.pause();
      this.play = false;
    } else if (!this.play) {
      vid.play();
      this.play = true;
    }
  }

  sanitizedURL() {
    return this._sanitizer.bypassSecurityTrustResourceUrl(this.videoURL);
  }
}
