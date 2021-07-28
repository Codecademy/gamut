// TODO add missing languages
import { LanguageIds } from '../services/languageIds';
import { LanguageServices } from './LanguageService';

export const languageServices = new LanguageServices(
  new Map([
    // [codecademyCpp, () => import('../services/cpp')],
    // [codecademyCSharp, () => import('../services/csharp')],
    // [codecademyCss, () => import('../services/css')],
    // [codecademyGo, () => import('../services/go')],
    // [codecademyHtml, () => import('../services/html')],
    // [codecademyJava, () => import('../services/java')],
    [LanguageIds.codecademyJs, () => import('../services/javascript')],
    // [codecademyKotlin, () => import('../services/kotlin')],
    // [codecademyPhp, () => import('../services/php')],
    // [codecademyPython, () => import('../services/python')],
    // [codecademyR, () => import('../services/r')],
    // [codecademyRazor, () => import('../services/razor')],
    // [codecademyRuby, () => import('../services/ruby')],
    // [codecademyScss, () => import('../services/scss')],
    // [codecademySql, () => import('../services/sql')],
    // [codecademySwift, () => import('../services/swift')],
  ])
);
