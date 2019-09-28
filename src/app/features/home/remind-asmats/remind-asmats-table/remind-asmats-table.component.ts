import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Asmat } from '../../../../model/asmat';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-remind-asmats-table',
  templateUrl: './remind-asmats-table.component.html',
  styleUrls: ['./remind-asmats-table.component.scss']
})
export class RemindAsmatsTableComponent implements OnInit {

  @Input()
  public remindAsmats: Asmat[];

  @ViewChild(MatSort, {static: true})
  public matSort: MatSort;

  public dataSource: MatTableDataSource<Asmat>;

  constructor() {
    this.remindAsmats = [];
    this.dataSource = new MatTableDataSource<Asmat>();
  }

  public ngOnInit() {
    this.dataSource.data = this.remindAsmats;
    this.dataSource.sort = this.matSort;
    this.dataSource.sortingDataAccessor = this.sortAsmatAccessor.bind(this);
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

  private sortAsmatAccessor(asmat: Asmat, property: string): number {
    if (property === 'remainingDays') {
      return this.computeRemainingDays(asmat);
    } else {
      return 0;
    }
  }
}
