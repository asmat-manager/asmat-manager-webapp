import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Asmat} from '../../../model/asmat';
import {Address} from '../../../model/address';
import {Router} from '@angular/router';
import {formatAvailability} from '../../../utils/asmat-utils';

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

  public hoveredAsmatId: string;

  constructor(private router: Router) {
    this.asmats = [];
    this.deleteClicked = new EventEmitter<Asmat>();
    this.hoveredAsmatId = '';
  }

  public formatAddress(address: Address): string {
    if (!address || (!address.postalCode && !address.streetNo && !address.city && !address.street)) {
      return '-';
    } else {
      const {postalCode, streetNo, street, city} = address;
      return `${streetNo} ${street}, ${postalCode} ${city}`;
    }
  }

  public formatAvailability(asmat: Asmat): string {
    return formatAvailability(asmat);
  }

  public onDeleteClicked(asmat: Asmat) {
    this.deleteClicked.emit(asmat);
  }

  public onMouseEntered(asmat: Asmat) {
    this.hoveredAsmatId = asmat._id;
  }

  public onMouseLeave() {
    this.hoveredAsmatId = '';
  }

  public onRowClicked(asmat: Asmat) {
    if (this.hoveredAsmatId !== '') {
      this.router.navigate(['home', 'asmats', asmat._id]);
    }
  }

  get displayColumns(): string[] {
    return [
      'lastName',
      'firstName',
      'address',
      'availability',
      'adherent',
      'actions'
    ];
  }
}
