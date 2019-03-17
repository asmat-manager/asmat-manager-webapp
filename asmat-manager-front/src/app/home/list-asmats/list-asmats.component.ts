import {Component, OnInit} from '@angular/core';
import {Asmat} from '../../model/asmat';
import {AsmatService} from '../../service/asmat.service';

@Component({
  selector: 'app-list-asmats',
  templateUrl: './list-asmats.component.html',
  styleUrls: ['./list-asmats.component.scss']
})
export class ListAsmatsComponent implements OnInit {

  public asmats: Asmat[];

  constructor(private asmatService: AsmatService) {
    this.asmats = [];
  }

  public ngOnInit() {
    this.asmatService.getAll()
      .subscribe(asmats => this.asmats = asmats);
  }

}
