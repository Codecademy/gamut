import type { editor as Editor } from 'monaco-editor';
import { useEffect, useState } from 'react';

// TODO add missing languages
import { getLanguageForFile } from '../getLanguage';
import { LanguageIds } from '../services/languageIds';
import { LanguageServices } from './LanguageService';
import { LanguageRegistration, Monaco } from './types';

const languageServices = new LanguageServices(
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

export type LanguageService = {
  id?: string;
  registration?: LanguageRegistration;
};

const useLanguageService = (
  fileName: string,
  editor?: Editor.IStandaloneCodeEditor,
  monaco?: Monaco
): LanguageService => {
  const [id, setId] = useState<string>();
  const [registration, setRegistration] = useState<LanguageRegistration>();

  useEffect(() => {
    if (!editor || !monaco) {
      return;
    }

    const model = editor.getModel()!;
    const previousId = id;
    const newId = getLanguageForFile(monaco, fileName);

    setId(newId);

    if (!newId) {
      return;
    }

    if (newId !== previousId) {
      monaco.editor.setModelLanguage(model, newId);
      model.setEOL(monaco.editor.EndOfLineSequence.LF);
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    languageServices.use(newId, monaco).then(setRegistration);
  }, [editor, fileName, id, monaco]);

  return { id, registration };
};

export default useLanguageService;
