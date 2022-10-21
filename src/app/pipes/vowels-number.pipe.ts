import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vowelsNumber'
})
export class VowelsNumberPipe implements PipeTransform {

  private vowels = [
    'a',
    'b',
    'c',
    'd',
    'e'
  ]
  transform(value: string) {
    // this.vowels.map(item => item[value])
    // return null;
  }

}
