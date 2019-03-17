import {Component, OnInit} from '@angular/core';
import {Asmat} from '../../model/asmat';

@Component({
  selector: 'app-list-asmats',
  templateUrl: './list-asmats.component.html',
  styleUrls: ['./list-asmats.component.scss']
})
export class ListAsmatsComponent implements OnInit {

  public asmats: Asmat[];

  constructor() {
    this.asmats = [];
  }

  public ngOnInit() {

  }

}
