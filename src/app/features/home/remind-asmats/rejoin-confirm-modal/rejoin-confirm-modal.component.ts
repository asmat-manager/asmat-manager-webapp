import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsmatDialogData } from '../../../../model/asmat-dialog-data';

@Component({
  selector: 'app-rejoin-confirm-modal',
  templateUrl: './rejoin-confirm-modal.component.html',
  styleUrls: ['./rejoin-confirm-modal.component.scss']
})
export class RejoinConfirmModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) private data: AsmatDialogData) { }

}
