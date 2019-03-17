import {Component, OnInit} from '@angular/core';
import {Asmat} from '../../model/asmat';
import {AsmatService} from '../../service/asmat.service';
import {AsmatFilter} from './asmat-filter';
import {AsmatFilterPipe} from './asmat-filter.pipe';

@Component({
  selector: 'app-list-asmats',
  templateUrl: './list-asmats.component.html',
  styleUrls: ['./list-asmats.component.scss']
})
export class ListAsmatsComponent implements OnInit {

  public searchInput: string;
  public adherentOnly: boolean;

  private asmats: Asmat[];
  private asmatFilterPipe: AsmatFilterPipe;

  constructor(private asmatService: AsmatService) {
    this.asmats = [];
    this.searchInput = '';
    this.adherentOnly = false;
    this.asmatFilterPipe = new AsmatFilterPipe();
  }

  public ngOnInit() {
    this.asmatService.getAll()
      .subscribe(asmats => this.asmats = asmats);
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
