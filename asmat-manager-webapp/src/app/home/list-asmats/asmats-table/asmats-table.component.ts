import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Asmat} from '../../../model/asmat';
import {Address} from '../../../model/address';
import {Router} from '@angular/router';

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

  public hoveredAsmatId: number;

  constructor(private router: Router) {
    this.asmats = [];
    this.deleteClicked = new EventEmitter<Asmat>();
    this.hoveredAsmatId = -1;
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

  public onMouseEntered(asmat: Asmat) {
    this.hoveredAsmatId = asmat.id;
  }

  public onMouseLeave() {
    this.hoveredAsmatId = -1;
  }

  public onRowClicked(asmat: Asmat) {
    if (this.hoveredAsmatId < 0) {
      return;
    }
    this.router.navigate(['home', 'asmats', asmat.id]);
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
