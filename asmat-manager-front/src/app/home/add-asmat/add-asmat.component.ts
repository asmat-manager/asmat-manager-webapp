import {Component} from '@angular/core';
import {Asmat} from '../../model/asmat';
import {AsmatService} from '../../service/asmat.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-asmat',
  templateUrl: './add-asmat.component.html',
  styleUrls: ['./add-asmat.component.scss']
})
export class AddAsmatComponent {

  constructor(private asmatService: AsmatService,
              private router: Router) { }

  public onAsmatSubmitted(asmat: Asmat) {
    this.asmatService.create(asmat)
      .subscribe(() => this.router.navigate(['home']));
  }
}
