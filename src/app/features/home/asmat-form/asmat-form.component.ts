import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CustomValidators } from '../../../validators/validators';
import { Asmat } from '../../../model/asmat';
import { Address } from '../../../model/address';

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

  private static dateAsString(date: Date | null): string | null {
    return date ? date.toISOString().substring(0, 10) : null;
  }

  public ngOnInit() {
    this.initialAsmat = this.initialAsmat || {
      address: {} as Address
    } as Asmat;

    const joiningDate = this.initialAsmat.joiningDate;
    const remindDate = this.initialAsmat.remindDate;

    this.asmatForm = this.fb.group({
      firstName: [this.initialAsmat.firstName || '', Validators.required],
      lastName: [this.initialAsmat.lastName || '', Validators.required],
      email: [this.initialAsmat.email || '', Validators.email],
      cellPhoneNumber: [this.initialAsmat.cellPhoneNumber || '', CustomValidators.phone],
      fixPhoneNumber: [this.initialAsmat.fixPhoneNumber || '', CustomValidators.phone],
      adherent: this.initialAsmat.adherent || false,
      address: this.fb.group({
        streetNo: this.initialAsmat.address.streetNo || '',
        street: this.initialAsmat.address.street || '',
        postalCode: [this.initialAsmat.address.postalCode || '', Validators.pattern(/\d{5}/)],
        city: this.initialAsmat.address.city || ''
      }),
      joiningDate: joiningDate ? AsmatFormComponent.dateAsString(new Date(joiningDate)) : null,
      remindDate: remindDate ? AsmatFormComponent.dateAsString(new Date(remindDate)) : null,
      receptions: this.initialAsmat.receptions || 0,
      availabilityCommunicated: this.initialAsmat.availabilityCommunicated || false,
      babyAvailability: [this.initialAsmat.babyAvailability || 0, Validators.min(0)],
      scholarAvailability: [this.initialAsmat.scholarAvailability || 0, Validators.min(0)]
    });
  }

  public onSubmit() {
    const asmat = this.asmatForm.value as Asmat;
    asmat._id = this.initialAsmat._id;
    this.asmatSubmitted.emit(asmat);
  }

  public back() {
    this.location.back();
  }

  public get availabilityCommunicated(): boolean {
    return this.asmatForm.get('availabilityCommunicated').value;
  }
}
