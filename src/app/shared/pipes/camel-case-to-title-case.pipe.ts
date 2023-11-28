import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToTitleCase'
})
export class CamelCaseToTitleCasePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }

    return value.replace(/([A-Z])/g, ' $1')
               .replace(/^./, (str) => str.toUpperCase())
               .trim();
  }
}