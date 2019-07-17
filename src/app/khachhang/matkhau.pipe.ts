import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matkhau'
})
export class MatkhauPipe implements PipeTransform {

  transform(value: any): any {
    return btoa(value);
  }

}
