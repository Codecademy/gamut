/**
 * A master list of all languages supported by our code renderer.
 * To support new languages, add them to this enum.
 */
export declare enum LanguageId {
    Default = "plaintext",
    Javascript = "codecademy-js"
}
export declare type TranslatableLanguageIds = Exclude<LanguageId, LanguageId.Default>;
export declare const languageIdKeys: string[];
