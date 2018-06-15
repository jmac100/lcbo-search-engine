import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'storeHoursConverter'
})
export class StoreHoursConverterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var time = ("00" + (value % 60)).slice(-2);
    var h24  = Math.floor(value / 60);
    var h12  = (0 == h24 ? 12 : (h24 > 12 ? (h24 - 10) - 2 : h24));
    var ampm = (h24 >= 12 ? 'PM' : 'AM');
    return h12 + ':' + time + ampm;
  }

  msmTo24time(msm) {
    var hour = msm / 60;
    var mins = msm % 60;

    return [hour, mins];
  }

}
