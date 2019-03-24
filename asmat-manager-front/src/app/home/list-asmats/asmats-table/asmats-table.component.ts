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

  constructor() {
    this.asmats = [];
    this.deleteClicked = new EventEmitter<Asmat>();
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
      'address',
      'adherent',
      'actions'
    ];
  }
}
