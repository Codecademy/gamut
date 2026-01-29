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
    describe.each([
      { input: undefined, description: 'undefined' },
      { input: null, description: 'null' },
      { input: '', description: 'empty string' },
      { input: 'invalid', description: 'invalid theme name' },
      { input: 123, description: 'non-string theme name' },
    ])(
      'should return core fonts when themeName is $description',
      ({ input }) => {
        it('returns core fonts', () => {
          const fonts = getFonts(input as any);

          expect(fonts).toBe(webFonts.core);
        });
      }
    );

    it('should return percipio fonts for percipio theme', () => {
      const fonts = getFonts('percipio');

      expect(fonts).toBe(webFonts.percipio);
    });

    it('should return core fonts for core theme', () => {
      const fonts = getFonts('core');

      expect(fonts).toBe(webFonts.core);
    });

    it('should not mutate or corrupt the original webFonts object', () => {
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
      const originalWebFonts = require('../../remoteAssets/fonts').webFonts;
      jest.doMock('../../remoteAssets/fonts', () => ({
        webFonts: undefined,
      }));
      // Re-import to get the mocked version
      jest.resetModules();
      const { getFonts: getFontsWithUndefined } = require('../fontUtils');

      expect(() => getFontsWithUndefined('core')).toThrow();

      jest.doMock('../../remoteAssets/fonts', () => ({
        webFonts: originalWebFonts,
      }));

      expect(getFonts('core')).toBe(webFonts.core);
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
      const result = getFontsWithUndefinedCore('core');

      expect(result).toBeUndefined();

      jest.doMock('../../remoteAssets/fonts', () => ({
        webFonts: originalWebFonts,
      }));

      expect(getFonts('core')).toBe(webFonts.core);
    });
  });
});
