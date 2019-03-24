import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common'
import {ActivatedRoute} from '@angular/router';
import {Asmat} from '../../model/asmat';
import {AsmatService} from '../../service/asmat.service';
import {tap} from 'rxjs/operators';
import {Address} from '../../model/address';

@Component({
  selector: 'app-asmat-details',
  templateUrl: './asmat-details.component.html',
  styleUrls: ['./asmat-details.component.scss']
})
export class AsmatDetailsComponent implements OnInit {

  public asmatLoaded: boolean;
  public asmat: Asmat;

  constructor(private route: ActivatedRoute,
              private asmatService: AsmatService,
              private location: Location) {
    this.asmatLoaded = false;
  }

  public ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.asmatService.getById(id)
      .pipe(tap(() => this.asmatLoaded = true))
      .subscribe(asmat => this.asmat = asmat);
  }

  public formatAddress(address: Address): string {
    if (!address || (!address.postalCode && !address.streetNo && !address.city && !address.street)) {
      return '-';
    } else {
      const {postalCode, streetNo, street, city} = address;
      return `${streetNo} ${street}, ${postalCode} ${city}`;
    }
  }

  public onBackClicked() {
    this.location.back();
  }
}
