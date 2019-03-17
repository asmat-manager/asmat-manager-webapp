import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {CustomValidators} from '../../validators/validators';
import {Asmat} from '../../model/asmat';
import {Address} from '../../model/address';

@Component({
  selector: 'app-asmat-form',
  templateUrl: './asmat-form.component.html',
  styleUrls: ['./asmat-form.component.scss']
})
export class AsmatFormComponent implements OnInit {

  @Input()
  public initialAsmat?: Asmat;

  @Output()
  public asmatSubmitted: EventEmitter<Asmat>;

  public asmatForm: FormGroup;

  constructor(private fb: FormBuilder,
              private location: Location) {
    this.asmatSubmitted = new EventEmitter<Asmat>();
  }

  public ngOnInit() {
    this.initialAsmat = this.initialAsmat || {
      address: {} as Address
    } as Asmat;

    this.asmatForm = this.fb.group({
      firstName: [this.initialAsmat.firstName || '', Validators.required],
      lastName: [this.initialAsmat.firstName || '', Validators.required],
      email: [this.initialAsmat.firstName || '', Validators.email],
      phoneNumber: [this.initialAsmat.firstName || '', CustomValidators.phone],
      adherent: false,
      address: this.fb.group({
        streetNo: this.initialAsmat.address.streetNo || '',
        street: this.initialAsmat.address.street || '',
        postalCode: [this.initialAsmat.address.postalCode || '', Validators.pattern(/\d{5}/)],
        city: this.initialAsmat.address.city || ''
      })
    });
  }

  public onSubmit() {
    const asmat = this.asmatForm.value as Asmat;
    this.asmatSubmitted.emit(asmat);
  }

  public back() {
    this.location.back();
  }
}
