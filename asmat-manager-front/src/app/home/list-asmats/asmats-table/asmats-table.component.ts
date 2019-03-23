import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Asmat} from '../../../model/asmat';
import {Address} from '../../../model/address';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-asmats-table',
  templateUrl: './asmats-table.component.html',
  styleUrls: ['./asmats-table.component.scss']
})
export class AsmatsTableComponent {

  @Input()
  public asmats: Asmat[];

  @Output()
  public deleteClicked: EventEmitter<Asmat>;

  @Input()
  public displayAll: boolean;

  constructor() {
    this.asmats = [];
    this.deleteClicked = new EventEmitter<Asmat>();
    this.displayAll = false;
  }

  public formatAddress(address: Address): string {
    if (!address || (!address.postalCode && !address.streetNo && !address.city && !address.street)) {
      return '-';
    } else {
      const {postalCode, streetNo, street, city} = address;
      return `${streetNo} ${street}, ${postalCode} ${city}`;
    }
  }

  public onDeleteClicked(asmat: Asmat) {
    this.deleteClicked.emit(asmat);
  }

  get displayColumns(): string[] {
    return [
      'lastName',
      'firstName',
      ...this.additionalColumns,
      'joiningDate',
      'remindDate',
      'receptions',
      'adherent',
      'actions'
    ];
  }

  private get additionalColumns(): string[] {
    return this.displayAll ? [
      'address',
      'email',
      'phone'
    ] : [];
  }
}
