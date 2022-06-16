import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfirmationDialogModel} from '@data/schema/ConfirmationDialogModal';

@Component({
  selector: 'app-confirmation-dialog-comp',
  templateUrl: './confirmation-dialog-comp.component.html',
  styleUrls: ['./confirmation-dialog-comp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogCompComponent  {

  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogCompComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogModel) {
    this.title = data.title;
    this.message = data.message;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }



}
