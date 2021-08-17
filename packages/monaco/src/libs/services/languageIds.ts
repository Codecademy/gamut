/**
 * A master list of all languages supported by our code renderer.
 * To support new languages, add them to this enum.
 */
export enum LanguageId {
  Default = 'plaintext',
  // Css = 'codecademy-css',
  // Go = 'codecademy-go',
  Html = 'codecademy-html',
  // Java = 'codecademy-java',
  Javascript = 'codecademy-js',
  // Php = 'codecademy-php',
  // Python = 'codecademy-python',
  // R = 'codecademy-r',
  // Ruby = 'codecademy-ruby',
  // Scss = 'codecademy-scss',
  // Sql = 'codecademy-sql',
  // Swift = 'codecademy-swift',
  // CSharp = 'codecademy-cs',
  // Cpp = 'codecademy-cpp',
  // Kotlin = 'codecademy-kotlin',
  // Razor = 'codecademy-razor',
}

export type TranslatableLanguageIds = Exclude<LanguageId, LanguageId.Default>;

export const languageIdKeys = Object.keys(LanguageId);
