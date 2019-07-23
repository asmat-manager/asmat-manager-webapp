import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {AsmatService} from '../../service/asmat.service';
import {Asmat} from '../../model/asmat';
import {Address} from '../../model/address';
import {ActivatedRoute, Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-print-table',
  templateUrl: './print-table.component.html',
  styleUrls: ['./print-table.component.scss']
})
export class PrintTableComponent implements OnInit {

  public asmats: Asmat[];
  public asmatsLoaded: boolean;

  private includeDates: boolean;
  private includeEmails: boolean;

  constructor(private asmatService: AsmatService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) {
    this.asmatsLoaded = false;
    this.asmats = [];
  }

  public ngOnInit() {
    const city = this.route.snapshot.queryParamMap.get('city');
    const adherentOnly = this.route.snapshot.queryParamMap.get('adherentOnly') === 'true';
    this.includeDates = this.route.snapshot.queryParamMap.get('includeDates') === 'true';
    this.includeEmails = this.route.snapshot.queryParamMap.get('includeEmails') === 'true';
    this.asmatService.getAll({city, adherentOnly})
      .pipe(tap(() => this.asmatsLoaded = true))
      .subscribe(asmats => this.asmats = asmats);
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

  public onValidate() {
    window.print();
    this.router.navigate(['home']);
  }

  public onCancelClicked() {
    this.location.back();
  }

  public get displayColumns(): string[] {
    let columns = [
      'name',
      'address',
      'receptions',
      'phones',
    ];

    if (this.includeEmails) {
      columns = [...columns, 'email'];
    }

    columns = [
      ...columns,
      'availability',
      'adherent'
    ];

    if (this.includeDates) {
      columns = [...columns, 'joiningDate', 'remindDate'];
    }

    return columns;
  }
}
