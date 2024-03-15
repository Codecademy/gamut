/**
 * A master list of all languages supported by our code renderer.
 * To support new languages, add them to this enum.
 */
export var LanguageId;

(function (LanguageId) {
  LanguageId["Default"] = "plaintext";
  LanguageId["Javascript"] = "codecademy-js";
})(LanguageId || (LanguageId = {}));

export var languageIdKeys = Object.keys(LanguageId);