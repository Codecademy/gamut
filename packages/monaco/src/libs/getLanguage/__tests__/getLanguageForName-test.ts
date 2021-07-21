import { mockMonacoWithLanguages } from '../../__fixtures__/mockMonacoWithLanguages';
import { getLanguageForName } from '..';

describe('getLanguageForFile', () => {
  describe('when passing a full name', () => {
    it('returns plaintext when not found', () => {
      const language = getLanguageForName(
        mockMonacoWithLanguages,
        'cool-language'
      );

      expect(language).toBe('plaintext');
    });

    it('returns the language when found', () => {
      const language = getLanguageForName(mockMonacoWithLanguages, 'known');

      expect(language).toBe('known');
    });

    it('returns the langage when uppercase is passed in', () => {
      const language = getLanguageForName(mockMonacoWithLanguages, 'Known');

      expect(language).toBe('known');
    });

    it('returns an override if applicable', () => {
      const language = getLanguageForName(mockMonacoWithLanguages, 'js');

      expect(language).toBe('codecademy-js');
    });
  });

  describe('when passing an extension', () => {
    it('returns plaintext when not found', () => {
      const language = getLanguageForName(mockMonacoWithLanguages, 'txt');

      expect(language).toBe('plaintext');
    });

    it('returns the langage when found', () => {
      const language = getLanguageForName(mockMonacoWithLanguages, 'css');

      expect(language).toBe('codecademy-css');
    });

    it('returns the langage when uppercase is passed in', () => {
      const language = getLanguageForName(mockMonacoWithLanguages, 'CSS');

      expect(language).toBe('codecademy-css');
    });
  });
});
