import { mockMonacoWithLanguages } from '../../__fixtures__/mockMonacoWithLanguages';
import { LanguageId } from '../../services/languageIds';
import { getLanguageForFile } from '..';

describe('getLanguageForFile', () => {
  it('returns plaintext when the file does not have an extension', () => {
    const language = getLanguageForFile(mockMonacoWithLanguages, 'main');

    expect(language).toBe(LanguageId.Default);
  });

  it('returns plaintext when the file is minified', () => {
    const language = getLanguageForFile(mockMonacoWithLanguages, 'main.min.js');

    expect(language).toBe(LanguageId.Default);
  });

  it('returns plaintext for an unknown extension', () => {
    const language = getLanguageForFile(
      mockMonacoWithLanguages,
      'main.unknown-extension-oh-my'
    );

    expect(language).toBe(LanguageId.Default);
  });

  it('returns the base language when the language is known and not overridden', () => {
    const language = getLanguageForFile(mockMonacoWithLanguages, 'main.js');

    expect(language).toBe(LanguageId.Javascript);
  });

  it('returns the overriden language when the language is known and overridden', () => {
    const language = getLanguageForFile(mockMonacoWithLanguages, 'main.known');

    expect(language).toBe('known');
  });
});
