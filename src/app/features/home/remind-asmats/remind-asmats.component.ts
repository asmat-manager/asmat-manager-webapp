import { Component, OnInit } from '@angular/core';
import { AsmatService } from '../../../service/asmat.service';
import { NEVER, Observable, of } from 'rxjs';
import { Asmat } from '../../../model/asmat';
import { flatMap, tap } from 'rxjs/operators';
import { computeRemindInterval } from '../../../utils/asmat-utils';
import { MatDialog } from '@angular/material/dialog';
import { RejoinConfirmModalComponent } from './rejoin-confirm-modal/rejoin-confirm-modal.component';
import { NavbarUpdateService } from '../../../service/navbar-update.service';
import { ToastService } from '../../../service/toast.service';

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
              private dialog: MatDialog,
              private toaster: ToastService) {
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
        const newJoiningDate = this.getNextJoiningDate(asmat);
        const updatedAsmat: Asmat = {
          ...asmat,
          joiningDate: newJoiningDate,
          adherent: true
        };
        return this.asmatService.update(updatedAsmat)
          .pipe(tap(() => this.toaster.open(`Adhésion renouvelée avec succès à la date du ${newJoiningDate.toLocaleDateString()}.`)));
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

  private getNextJoiningDate(asmat: Asmat): Date {
    const now = new Date();
    const oldJoiningDate = new Date(asmat.joiningEndDate);
    if (oldJoiningDate < now) {
      return new Date(now.toISOString().substring(0, 10));
    } else {
      return oldJoiningDate;
    }
  }
}
