import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Asmat } from '../../../../model/asmat';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-remind-asmats-table',
  templateUrl: './remind-asmats-table.component.html',
  styleUrls: ['./remind-asmats-table.component.scss']
})
export class RemindAsmatsTableComponent implements OnInit {

  private readonly DAYS_WARN_THRESHOLD = 7;
  private readonly DAYS_ALERT_THRESHOLD = 0;

  @Input()
  public remindAsmats: Asmat[];

  @Output()
  public onRejoinConfirmed: EventEmitter<Asmat>;

  @ViewChild(MatSort, {static: true})
  public matSort: MatSort;

  public dataSource: MatTableDataSource<Asmat>;

  constructor() {
    this.remindAsmats = [];
    this.dataSource = new MatTableDataSource<Asmat>();
    this.onRejoinConfirmed = new EventEmitter<Asmat>();
  }

  public ngOnInit() {
    this.dataSource.data = this.remindAsmats;
    this.dataSource.sort = this.matSort;
    this.dataSource.sortingDataAccessor = this.sortAsmatAccessor.bind(this);
  }

  public formatRemainingDays(asmat: Asmat): string {
    const remainingDays = this.computeRemainingDays(asmat);
    if (remainingDays >= 0) {
      const message = `${remainingDays} jour`;
      return remainingDays > 1 ? `${message}s` : message;
    } else {
      const message = `il y a ${Math.abs(remainingDays)} jour`;
      return remainingDays < -1 ? `${message}s` : message;
    }
  }

  public computeRemainingDays(asmat: Asmat): number {
    const joiningEndDate = new Date(asmat.joiningEndDate);
    const now = new Date(new Date().toISOString().substring(0, 10));
    return (joiningEndDate.valueOf() - now.valueOf()) / (24 * 3600 * 1000);
  }

  public getAlertMessage(asmat: Asmat): string {
    const type = this.getAlertType(asmat);
    if (type === 'warn') {
      return 'L\'adhésion arrive à expiration.';
    } else {
      return 'L\'adhésion a expirée. L\'assistante maternelle a 30 jours pour renouveler son adhésion.';
    }
  }

  public getAlertType(asmat: Asmat): 'warn' | 'urgent' | 'none' {
    const remainingDays = this.computeRemainingDays(asmat);
    if (remainingDays < this.DAYS_ALERT_THRESHOLD) {
      return 'urgent';
    } else if (remainingDays < this.DAYS_WARN_THRESHOLD) {
      return 'warn';
    }
    return 'none';
  }

  public get displayedColumns(): string[] {
    return [
      'alert',
      'fullname',
      'email',
      'joiningEndDate',
      'remainingDays',
      'actions'
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
