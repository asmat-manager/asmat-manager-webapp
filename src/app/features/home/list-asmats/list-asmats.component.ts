import { Component, OnInit } from '@angular/core';
import { Asmat } from '../../../model/asmat';
import { AsmatService } from '../../../service/asmat.service';
import { AsmatFilter } from './asmat-filter';
import { AsmatFilterPipe } from './asmat-filter.pipe';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmModalComponent } from '../delete-confirm-modal/delete-confirm-modal.component';
import { flatMap, tap } from 'rxjs/operators';
import { NEVER, of } from 'rxjs';
import { AsmatDialogData } from '../../../model/asmat-dialog-data';
import { PrintModalComponent } from './print-modal/print-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarUpdateService } from '../../../service/navbar-update.service';

@Component({
  selector: 'app-list-asmats',
  templateUrl: './list-asmats.component.html',
  styleUrls: ['./list-asmats.component.scss']
})
export class ListAsmatsComponent implements OnInit {

  public searchInput: string;
  public adherentOnly: boolean;
  public asmatsLoaded: boolean;

  private asmats: Asmat[];
  private asmatFilterPipe: AsmatFilterPipe;

  constructor(private asmatService: AsmatService,
              private navbarUpdateService: NavbarUpdateService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router) {
    this.asmats = [];
    this.searchInput = '';
    this.adherentOnly = false;
    this.asmatsLoaded = false;
    this.asmatFilterPipe = new AsmatFilterPipe();
  }

  public ngOnInit() {
    this.asmatService.getAll()
      .pipe(tap(() => this.asmatsLoaded = true))
      .subscribe(asmats => this.asmats = asmats);
    this.route.queryParamMap.subscribe(queryParams => {
      this.searchInput = queryParams.get('query') || '';
    });
  }

  public onSearchInput(event: any) {
    const {target: {value}} = event;
    const queryParams = {query: value};
    this.router.navigate([], {queryParams});
  }

  public onDeleteClicked(asmat: Asmat) {
    this.dialog.open(DeleteConfirmModalComponent, {
      hasBackdrop: true,
      position: {
        top: '30vh'
      },
      data: {
        asmat
      } as AsmatDialogData
    })
      .afterClosed()
      .pipe(
        flatMap(shouldDelete => shouldDelete ? this.asmatService.deleteById(asmat._id) : NEVER),
        tap(() => this.navbarUpdateService.update())
      )
      .subscribe(() => this.asmats.splice(this.asmats.indexOf(asmat), 1));
  }

  public onPrintClicked() {
    this.asmatService.getCities().pipe(
      flatMap(cities => this.dialog.open(PrintModalComponent, {
        hasBackdrop: true,
        position: {
          top: '30vh'
        },
        data: {
          cities
        }
      }).afterClosed()),
      flatMap(result => result ? of(result) : NEVER)
    ).subscribe((queryParams) =>
      this.router.navigate(['/', 'home', 'print'], {queryParams})
    );
  }

  public get filteredAsmats(): Asmat[] {
    return this.asmatFilterPipe.transform(this.asmats, this.filter);
  }

  private get filter(): AsmatFilter {
    return {
      keywords: this.searchInput,
      adherent: this.adherentOnly
    };
  }
}
