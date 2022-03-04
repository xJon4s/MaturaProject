import { Gameplayer } from './gameplayer';

describe('Gameplayer', () => {
  it('should create an instance', () => {
    expect(new Gameplayer(-1,-1)).toBeTruthy();
  });
});
