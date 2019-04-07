import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
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

  public formatAvailability(asmat: Asmat): string {
    if (asmat.availabilityCommunicated) {
      const babyAvailability = asmat.babyAvailability;
      const scholarAvailability = asmat.scholarAvailability;

      if (babyAvailability === 0 && scholarAvailability === 0) {
        return 'Aucune';
      } else {
        let result = '';
        if (babyAvailability > 0) {
          result += `${babyAvailability} bébé${babyAvailability > 1 ? 's' : ''}`;
          if (scholarAvailability > 0) {
            result += ' et ';
          }
        }
        if (scholarAvailability > 0) {
          result += `${scholarAvailability} périscolaire${scholarAvailability > 1 ? 's' : ''}`;
        }
        return result;
      }
    } else {
      return 'Non communiquée';
    }
  }

  public onBackClicked() {
    this.location.back();
  }
}
