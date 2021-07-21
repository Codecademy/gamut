import { mockMonacoWithLanguages } from '../../__fixtures__/mockMonacoWithLanguages';
import { getLanguageForFile } from '..';

describe('getLanguageForFile', () => {
  it('returns plaintext when the file does not have an extension', () => {
    const language = getLanguageForFile(mockMonacoWithLanguages, 'main');

    expect(language).toBe('plaintext');
  });

  it('returns plaintext when the file is minified', () => {
    const language = getLanguageForFile(mockMonacoWithLanguages, 'main.min.js');

    expect(language).toBe('plaintext');
  });

  it('returns plaintext for an unknown extension', () => {
    const language = getLanguageForFile(
      mockMonacoWithLanguages,
      'main.unknown-extension-oh-my'
    );

    expect(language).toBe('plaintext');
  });

  it('returns the base language when the language is known and not overriden', () => {
    const language = getLanguageForFile(mockMonacoWithLanguages, 'main.css');

    expect(language).toBe('codecademy-css');
  });

  it('returns the overriden language when the language is known and overriden', () => {
    const language = getLanguageForFile(mockMonacoWithLanguages, 'main.known');

    expect(language).toBe('known');
  });
});
