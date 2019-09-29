import { Component, OnInit } from '@angular/core';
import { AsmatService } from '../../service/asmat.service';
import { Observable } from 'rxjs';
import { computeRemindInterval } from '../../utils/asmat-utils';
import { flatMap, map, startWith } from 'rxjs/operators';
import { NavbarUpdateService } from '../../service/navbar-update.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NavbarUpdateService]
})
export class HomeComponent implements OnInit {

  public remindsCount: Observable<number>;

  constructor(private asmatService: AsmatService,
              private navbarUpdateService: NavbarUpdateService) {
  }

  public ngOnInit() {
    this.remindsCount = this.navbarUpdateService.navbarUpdate
      .pipe(
        startWith(),
        flatMap(() => this.asmatService.getAllByJoiningEndDateBetween(computeRemindInterval())),
        map(asmats => asmats.length || null)
      );
  }
}
