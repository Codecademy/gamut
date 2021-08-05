// TODO add missing languages
import { LanguageId } from '../services/languageIds';
import { LanguageServices } from './LanguageService';

export const importedLanguages = new Map([
  // [LanguageId.CodecademyCpp, () => import('../services/cpp')],
  // [LanguageId.CodecademyCSharp, () => import('../services/csharp')],
  // [LanguageId.CodecademyCss, () => import('../services/css')],
  // [LanguageId.CodecademyGo, () => import('../services/go')],
  // [LanguageId.CodecademyHtml, () => import('../services/html')],
  // [LanguageId.CodecademyJava, () => import('../services/java')],
  [LanguageId.CodecademyJs, () => import('../services/javascript')],
  // [LanguageId.CodecademyKotlin, () => import('../services/kotlin')],
  // [LanguageId.CodecademyPhp, () => import('../services/php')],
  // [LanguageId.CodecademyPython, () => import('../services/python')],
  // [LanguageId.CodecademyR, () => import('../services/r')],
  // [LanguageId.CodecademyRazor, () => import('../services/razor')],
  // [LanguageId.CodecademyRuby, () => import('../services/ruby')],
  // [LanguageId.CodecademyScss, () => import('../services/scss')],
  // [LanguageId.CodecademySql, () => import('../services/sql')],
  // [LanguageId.CodecademySwift, () => import('../services/swift')],
]);

export const languageServices = new LanguageServices(importedLanguages);
