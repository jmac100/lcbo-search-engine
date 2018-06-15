import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metresToKilometres'
})
export class MetresToKilometresPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value < 1000) return value + ' m';
    let val = args == null
      ? value / 1000
      : (value / 1000).toFixed(args);
    return val + ' km';
  }
}
