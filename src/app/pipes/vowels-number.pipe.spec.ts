import { VowelsNumberPipe } from './vowels-number.pipe';

describe('VowelsNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new VowelsNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
