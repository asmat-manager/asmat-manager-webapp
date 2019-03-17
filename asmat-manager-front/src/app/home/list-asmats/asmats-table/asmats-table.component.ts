import {Component, Input} from '@angular/core';
import {Asmat} from '../../../model/asmat';

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

  get displayedColumns(): string[] {
    return [
      'firstName',
      'lastName',
      'address',
      'email',
      'phone'
    ];
  }

}
