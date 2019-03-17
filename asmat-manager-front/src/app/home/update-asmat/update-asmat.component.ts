import {Component, OnInit} from '@angular/core';
import {AsmatService} from '../../service/asmat.service';
import {Asmat} from '../../model/asmat';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-asmat',
  templateUrl: './update-asmat.component.html',
  styleUrls: ['./update-asmat.component.scss']
})
export class UpdateAsmatComponent implements OnInit {

  private asmat: Asmat;

  constructor(private asmatService: AsmatService,
              private route: ActivatedRoute) {
    this.asmat = null;
  }

  public ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.asmatService.getById(id)
      .subscribe(asmat => this.asmat = asmat);
  }

  public onAsmatSubmitted(asmat: Asmat) {

  }
}
