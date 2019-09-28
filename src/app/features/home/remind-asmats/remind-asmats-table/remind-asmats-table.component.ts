import { Component, Input } from '@angular/core';
import { Asmat } from '../../../../model/asmat';

@Component({
  selector: 'app-remind-asmats-table',
  templateUrl: './remind-asmats-table.component.html',
  styleUrls: ['./remind-asmats-table.component.scss']
})
export class RemindAsmatsTableComponent {

  @Input()
  public remindAsmats: Asmat[];

  constructor() {
    this.remindAsmats = [];
  }

  public computeRemainingDays(asmat: Asmat): number {
    const joiningEndDate = new Date(asmat.joiningEndDate);
    const now = new Date(new Date().toISOString().substring(0, 10));
    return (joiningEndDate.valueOf() - now.valueOf()) / (24 * 3600 * 1000);
  }

  public get displayedColumns(): string[] {
    return [
      'fullname',
      'joiningEndDate',
      'remainingDays'
    ];
  }
}
