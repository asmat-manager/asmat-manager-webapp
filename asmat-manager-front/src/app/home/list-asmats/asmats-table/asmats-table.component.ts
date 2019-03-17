import {Component, Input} from '@angular/core';
import {Asmat} from '../../../model/asmat';
import {Address} from '../../../model/address';

@Component({
  selector: 'app-asmats-table',
  templateUrl: './asmats-table.component.html',
  styleUrls: ['./asmats-table.component.scss']
})
export class AsmatsTableComponent {

  @Input()
  public asmats: Asmat[];

  constructor() {
    this.asmats = [];
  }

  public formatAddress(address: Address): string {
    if (!address || (!address.postalCode && !address.streetNo && !address.city && !address.street)) {
      return '-';
    } else {
      const { postalCode, streetNo, street, city } = address;
      return `${streetNo} ${street}, ${postalCode} ${city}`;
    }
  }

  get displayedColumns(): string[] {
    return [
      'firstName',
      'lastName',
      'address',
      'email',
      'phone',
      'adherent',
      'actions'
    ];
  }

}
