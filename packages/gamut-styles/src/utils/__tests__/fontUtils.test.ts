import { webFonts } from '../../remoteAssets/fonts';
import { getFonts } from '../fontUtils';

jest.mock('../../remoteAssets/fonts', () => ({
  webFonts: {
    core: [
      {
        filePath: 'https://www.codecademy.com/gamut/apercu-regular-pro',
        extensions: ['woff2', 'woff'],
        name: 'Apercu',
      },
      {
        filePath: 'https://www.codecademy.com/gamut/apercu-bold-pro',
        extensions: ['woff2', 'woff'],
        name: 'Apercu',
        weight: 'bold',
      },
    ],
    percipio: [
      {
        filePath: 'https://www.codecademy.com/gamut/roboto-regular',
        extensions: ['woff2', 'woff'],
        name: 'Roboto',
      },
      {
        filePath: 'https://www.codecademy.com/gamut/roboto-bold',
        extensions: ['woff2', 'woff'],
        name: 'Roboto',
        weight: 'bold',
      },
    ],
  },
}));

describe('fontUtils', () => {
  describe('getFonts', () => {
    it('should return core fonts when themeName is undefined', () => {
      const fonts = getFonts(undefined);
      expect(fonts).toBe(webFonts.core);
    });

    it('should return core fonts when themeName is null', () => {
      const fonts = getFonts(null as any);
      expect(fonts).toBe(webFonts.core);
    });

    it('should return core fonts when themeName is empty string', () => {
      const fonts = getFonts('');
      expect(fonts).toBe(webFonts.core);
    });

    it('should return core fonts for invalid theme names', () => {
      const fonts = getFonts('invalid');
      expect(fonts).toBe(webFonts.core);
    });

    it('should return core fonts for non-string theme names', () => {
      const fonts = getFonts(123 as any);
      expect(fonts).toBe(webFonts.core);
    });

    it('should return percipio fonts for percipio theme', () => {
      const fonts = getFonts('percipio');
      expect(fonts).toBe(webFonts.percipio);
    });

    it('should return core fonts for core theme', () => {
      const fonts = getFonts('core');
      expect(fonts).toBe(webFonts.core);
    });

    it('should handle case sensitivity', () => {
      const fonts = getFonts('PERCIPIO');
      expect(fonts).toBe(webFonts.core);
    });

    it('should return a readonly array', () => {
      const fonts = getFonts('percipio');
      expect(Array.isArray(fonts)).toBe(true);
    });

    it('should not mutate the original webFonts object', () => {
      const originalCore = webFonts.core;
      const originalPercipio = webFonts.percipio;

      getFonts('percipio');
      getFonts('core');
      getFonts('invalid');

      expect(webFonts.core).toBe(originalCore);
      expect(webFonts.percipio).toBe(originalPercipio);
    });
  });

  describe('error handling', () => {
    it('should handle webFonts being undefined', () => {
      // Mock webFonts as undefined
      const originalWebFonts = require('../../remoteAssets/fonts').webFonts;
      jest.doMock('../../remoteAssets/fonts', () => ({
        webFonts: undefined,
      }));

      // Re-import to get the mocked version
      jest.resetModules();
      const { getFonts: getFontsWithUndefined } = require('../fontUtils');

      expect(() => getFontsWithUndefined('core')).toThrow();

      // Restore original mock
      jest.doMock('../../remoteAssets/fonts', () => ({
        webFonts: originalWebFonts,
      }));
    });

    it('should handle webFonts.core being undefined', () => {
      const originalWebFonts = require('../../remoteAssets/fonts').webFonts;
      jest.doMock('../../remoteAssets/fonts', () => ({
        webFonts: {
          core: undefined,
          percipio: webFonts.percipio,
        },
      }));

      jest.resetModules();
      const { getFonts: getFontsWithUndefinedCore } = require('../fontUtils');

      expect(() => getFontsWithUndefinedCore('core')).not.toThrow();

      // Restore original mock
      jest.doMock('../../remoteAssets/fonts', () => ({
        webFonts: originalWebFonts,
      }));
    });
  });
});
