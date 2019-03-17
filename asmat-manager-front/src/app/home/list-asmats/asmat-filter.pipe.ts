import {Pipe, PipeTransform} from '@angular/core';
import {Asmat} from '../../model/asmat';

@Pipe({
  name: 'asmatFilter'
})
export class AsmatFilterPipe implements PipeTransform {

  public transform(asmats: Asmat[], keyword: string): Asmat[] {
    const kw = keyword.trim().toLowerCase();
    return asmats.filter(asmat =>
      asmat.firstName.toLowerCase().startsWith(kw) ||
      asmat.lastName.toLowerCase().startsWith(kw));
  }

}
