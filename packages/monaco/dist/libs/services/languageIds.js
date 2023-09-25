/**
 * A master list of all languages supported by our code renderer.
 * To support new languages, add them to this enum.
 */
export var LanguageId; // Php = 'codecademy-php',
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
(function (LanguageId) {
  LanguageId["Default"] = "plaintext";
  LanguageId["Javascript"] = "codecademy-js";
})(LanguageId || (LanguageId = {}));
export var languageIdKeys = Object.keys(LanguageId);