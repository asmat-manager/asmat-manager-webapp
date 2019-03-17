import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../validators/validators';
import {Asmat} from '../../model/asmat';

@Component({
  selector: 'app-asmat-form',
  templateUrl: './asmat-form.component.html',
  styleUrls: ['./asmat-form.component.scss']
})
export class AsmatFormComponent implements OnInit {

  @Input()
  public asmat?: Asmat;

  public asmatForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit() {
    this.asmat = this.asmat || {};

    this.asmatForm = this.fb.group({
      firstName: [this.asmat.firstName || '', Validators.required],
      lastName: [this.asmat.firstName || '', Validators.required],
      email: [this.asmat.firstName || '', Validators.email],
      phoneNumber: [this.asmat.firstName || '', CustomValidators.phone]
    });
  }

}
