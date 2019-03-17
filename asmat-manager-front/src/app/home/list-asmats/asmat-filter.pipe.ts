import {Pipe, PipeTransform} from '@angular/core';
import {Asmat} from '../../model/asmat';
import {AsmatFilter} from './asmat-filter';

@Pipe({
  name: 'asmatFilter'
})
export class AsmatFilterPipe implements PipeTransform {

  public transform(asmats: Asmat[], filter: AsmatFilter): Asmat[] {
    const kw = filter.keywords.trim().toLowerCase();

    return asmats
      .filter(asmat => !filter.adherent || asmat.adherent)
      .filter(asmat =>
        asmat.firstName.toLowerCase().startsWith(kw) ||
        asmat.lastName.toLowerCase().startsWith(kw) ||
        (asmat.address && asmat.address.city && asmat.address.city.toLowerCase().startsWith(kw)));
  }

}
