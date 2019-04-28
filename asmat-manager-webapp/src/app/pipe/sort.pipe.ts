import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  public transform(value: string[]): string[] {
    return value.sort((a, b) => a.localeCompare(b));
  }

}
