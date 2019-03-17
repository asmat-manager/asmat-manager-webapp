import {Component, Inject} from '@angular/core';
import {DeleteConfirmModalData} from './delete-confirm-modal-data';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
  styleUrls: ['./delete-confirm-modal.component.scss']
})
export class DeleteConfirmModalComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteConfirmModalData) {
  }

}
