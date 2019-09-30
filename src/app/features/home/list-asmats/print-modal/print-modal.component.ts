import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-print-modal',
  templateUrl: './print-modal.component.html',
  styleUrls: ['./print-modal.component.scss']
})
export class PrintModalComponent implements OnInit {

  public printForm: FormGroup;

  constructor(private fb: FormBuilder,
              private ref: MatDialogRef<PrintModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public ngOnInit() {
    this.printForm = this.fb.group({
      city: [null, Validators.required],
      adherentOnly: false,
      includeDate: false,
      includeEmails: false
    });
  }

  public onSubmit() {
    this.ref.close(this.printForm.value);
  }
}
