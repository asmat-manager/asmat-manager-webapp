import { Component, OnInit } from '@angular/core';
import { AsmatService } from '../../../service/asmat.service';
import { Observable } from 'rxjs';
import { Asmat } from '../../../model/asmat';
import { tap } from 'rxjs/operators';
import { computeRemindInterval } from '../../../utils/asmat-utils';

@Component({
  selector: 'app-remind-asmats',
  templateUrl: './remind-asmats.component.html',
  styleUrls: ['./remind-asmats.component.scss']
})
export class RemindAsmatsComponent implements OnInit {

  public loading: boolean;
  public remindAsmats: Asmat[];

  constructor(private asmatService: AsmatService) {
    this.remindAsmats = [];
  }

  public ngOnInit() {
    this.loadRemindAsmats()
      .subscribe(remindAsmats => this.remindAsmats = remindAsmats);
  }

  private loadRemindAsmats(): Observable<Asmat[]> {
    this.loading = true;
    return this.asmatService.getAllByJoiningEndDateBetween(computeRemindInterval())
      .pipe(tap(() => this.loading = false));
  }
}
