import {Component, OnInit} from '@angular/core';
import {Asmat} from '../../model/asmat';
import {AsmatService} from '../../service/asmat.service';
import {AsmatFilter} from './asmat-filter';
import {AsmatFilterPipe} from './asmat-filter.pipe';
import {MatDialog} from '@angular/material';
import {DeleteConfirmModalComponent} from '../delete-confirm-modal/delete-confirm-modal.component';
import {flatMap, map, tap} from 'rxjs/operators';
import {NEVER} from 'rxjs';
import {DeleteConfirmModalData} from '../delete-confirm-modal/delete-confirm-modal-data';
import {PrintModalComponent} from './print-modal/print-modal.component';
import {Router} from '@angular/router';

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
              private dialog: MatDialog,
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
  }

  public get filteredAsmats(): Asmat[] {
    return this.asmatFilterPipe.transform(this.asmats, this.filter);
  }

  public onDeleteClicked(asmat: Asmat) {
    this.dialog.open(DeleteConfirmModalComponent, {
      hasBackdrop: true,
      position: {
        top: '30vh'
      },
      data: {
        asmat
      } as DeleteConfirmModalData
    })
      .afterClosed()
      .pipe(
        flatMap(shouldDelete => shouldDelete ? this.asmatService.deleteById(asmat.id) : NEVER)
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
      map(result => result ? result : NEVER)
    ).subscribe(({city, includeDates}) => this.router.navigate(['/', 'home', 'print'], {
      queryParams: {
        city,
        dates: includeDates
      }
    }));
  }

  private get filter(): AsmatFilter {
    return {
      keywords: this.searchInput,
      adherent: this.adherentOnly
    };
  }
}
