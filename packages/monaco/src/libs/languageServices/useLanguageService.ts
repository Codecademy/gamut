import type { editor as Editor } from 'monaco-editor';
import { useEffect, useState } from 'react';

import { getLanguageForFile } from '../getLanguage';
import { importedLanguages } from '.';
import { LanguageServices } from './LanguageService';
import { LanguageRegistration, Monaco } from './types';

const languageServices = new LanguageServices(importedLanguages);

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
