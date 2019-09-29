import {Component, Inject} from '@angular/core';
import {AsmatDialogData} from '../../../model/asmat-dialog-data';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
  styleUrls: ['./delete-confirm-modal.component.scss']
})
export class DeleteConfirmModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: AsmatDialogData) {
  }

}
