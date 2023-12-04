import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToTitleCase'
})
export class CamelCaseToTitleCasePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
