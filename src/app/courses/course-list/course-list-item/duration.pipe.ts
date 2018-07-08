import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform = (min: number): string =>
    `${Math.floor(min / 60) ? `${Math.floor(min / 60)}h` : ''} ${String((min % 60)).padStart(2, '0') }min`

}
