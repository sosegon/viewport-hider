import { clampStyle } from './utils';

describe('utils', () => {
  describe('clampStyle', () => {
    it('should clamp empty string', () => {
      expect(clampStyle('', 0, 100)).toEqual('');
    });
    it('should clamp value in px', () => {
      expect(clampStyle('2 px', 0, 100)).toEqual('2px');
    });
    it('should clamp value in pxx', () => {
      expect(clampStyle('2pxx', 0, 100)).toEqual('2px');
    });
    it('should clamp value in x_pxx', () => {
      expect(clampStyle('x2pxx', 0, 100)).toEqual('x2pxx');
    });
    it('should clamp value in px (higher limit)', () => {
      expect(clampStyle('200 px', 0, 100)).toEqual('100px');
    });
    it('should clamp value in px (lower limit)', () => {
      expect(clampStyle('-10px', 0, 100)).toEqual('0px');
    });
  });
});
