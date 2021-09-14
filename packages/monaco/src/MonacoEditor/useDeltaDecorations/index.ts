import { useEffect, useState } from 'react';

import { LanguageRegistration } from '../../libs/languageServices/types';
import { Editor } from '../types';

export const useDeltaDecorations = (
  editor?: Editor.IStandaloneCodeEditor,
  registration?: LanguageRegistration
) => {
  const [decorations, setDecorations] = useState<string[]>();
  const model = editor?.getModel();
  const content = model?.getValue();

  useEffect(() => {
    if (content === undefined || !model || !registration) {
      return;
    }

    setDecorations((decorations) =>
      model.deltaDecorations(
        decorations ?? [],
        (content && registration.validateSyntax?.(content)) || []
      )
    );
  }, [content, model, registration]);

  return decorations;
};
