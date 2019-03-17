import {Component, OnInit} from '@angular/core';
import {Asmat} from '../../model/asmat';
import {AsmatService} from '../../service/asmat.service';
import {AsmatFilter} from './asmat-filter';

@Component({
  selector: 'app-list-asmats',
  templateUrl: './list-asmats.component.html',
  styleUrls: ['./list-asmats.component.scss']
})
export class ListAsmatsComponent implements OnInit {

  public asmats: Asmat[];
  public searchInput: string;
  public adherentOnly: boolean;

  constructor(private asmatService: AsmatService) {
    this.asmats = [];
    this.searchInput = '';
    this.adherentOnly = false;
  }

  public ngOnInit() {
    this.asmatService.getAll()
      .subscribe(asmats => this.asmats = asmats);
  }

  public get filter(): AsmatFilter {
    return {
      keywords: this.searchInput,
      adherent: this.adherentOnly
    };
  }


}
