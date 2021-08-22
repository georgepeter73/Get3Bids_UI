import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'app-media-dialog',
  templateUrl: './media-dialog.component.html',
  styleUrls: ['./media-dialog.component.scss'],

})
export class MediaDialogComponent implements OnInit {
  @Input() title: string;

  constructor(protected ref: NbDialogRef<MediaDialogComponent>) {}

  dismiss() {
    this.ref.close();
  }

  ngOnInit(): void {
    alert("testing")
  }
}
