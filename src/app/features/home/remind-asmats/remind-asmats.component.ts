import { Component, OnInit } from '@angular/core';
import { AsmatService } from '../../../service/asmat.service';
import { NEVER, Observable, of } from 'rxjs';
import { Asmat } from '../../../model/asmat';
import { flatMap, tap } from 'rxjs/operators';
import { computeRemindInterval } from '../../../utils/asmat-utils';
import { MatDialog } from '@angular/material/dialog';
import { RejoinConfirmModalComponent } from './rejoin-confirm-modal/rejoin-confirm-modal.component';
import { NavbarUpdateService } from '../../../service/navbar-update.service';

@Component({
  selector: 'app-remind-asmats',
  templateUrl: './remind-asmats.component.html',
  styleUrls: ['./remind-asmats.component.scss']
})
export class RemindAsmatsComponent implements OnInit {

  public loading: boolean;
  public remindAsmats: Asmat[];

  constructor(private asmatService: AsmatService,
              private navbarUpdateService: NavbarUpdateService,
              private dialog: MatDialog) {
    this.remindAsmats = [];
  }

  public ngOnInit() {
    this.loadRemindAsmats()
      .subscribe(remindAsmats => this.remindAsmats = remindAsmats);
  }

  public onConfirmJoining(asmat: Asmat) {
    this.dialog.open(RejoinConfirmModalComponent, {
      hasBackdrop: true,
      position: {
        top: '30vh'
      },
      data: {
        asmat
      }
    }).afterClosed().pipe(
      flatMap(result => result ? of(result) : NEVER),
      flatMap(() => {
        const newJoiningDate = new Date(asmat.joiningEndDate);
        const updatedAsmat: Asmat = {
          ...asmat,
          joiningDate: newJoiningDate
        };
        return this.asmatService.update(updatedAsmat);
      }),
      tap(() => this.navbarUpdateService.update()),
      flatMap(() => this.loadRemindAsmats())
    ).subscribe(asmats => this.remindAsmats = asmats);
  }

  private loadRemindAsmats(): Observable<Asmat[]> {
    this.loading = true;
    return this.asmatService.getAllByJoiningEndDateBetween(computeRemindInterval())
      .pipe(tap(() => this.loading = false));
  }
}
