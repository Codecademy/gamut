import {
  mockLanguagesInMonaco,
  mockMonacoWithLanguages,
} from '../../__fixtures__/mockMonacoWithLanguages';
import { LanguageId } from '../../services/languageIds';
import { getLanguageForName, languageOverrides } from '..';

const overriddenLanguageKey = 'javascript';
const overriddenLanguageId = languageOverrides.get('javascript');

const knownLanguage = mockLanguagesInMonaco[0];

describe('getLanguageForFile', () => {
  describe('when passing a full name', () => {
    it('returns plaintext when not found', () => {
      const language = getLanguageForName(mockMonacoWithLanguages, 'txt');

      expect(language).toBe('plaintext');
    });

    it('returns the language when found', () => {
      const language = getLanguageForName(
        mockMonacoWithLanguages,
        knownLanguage.id
      );

      expect(language).toBe(knownLanguage.id);
    });

    it('returns the langage when uppercase is passed in', () => {
      const language = getLanguageForName(
        mockMonacoWithLanguages,
        knownLanguage.id.toUpperCase()
      );

      expect(language).toBe(knownLanguage.id);
    });

    it('returns an override if applicable', () => {
      const language = getLanguageForName(
        mockMonacoWithLanguages,
        overriddenLanguageKey
      );

      expect(language).toBe(overriddenLanguageId);
    });
  });

  describe('when passing an extension', () => {
    it('returns plaintext when not found', () => {
      const language = getLanguageForName(mockMonacoWithLanguages, 'txt');

      expect(language).toBe(LanguageId.Default);
    });

    it('returns the langage when found', () => {
      const language = getLanguageForName(
        mockMonacoWithLanguages,
        overriddenLanguageKey
      );

      expect(language).toBe(overriddenLanguageId);
    });

    it('returns the langage when uppercase is passed in', () => {
      const language = getLanguageForName(
        mockMonacoWithLanguages,
        overriddenLanguageKey.toUpperCase()
      );

      expect(language).toBe(overriddenLanguageId);
    });
  });
});
