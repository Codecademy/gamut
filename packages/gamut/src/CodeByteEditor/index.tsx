
import { Background, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';


import type { languageOption } from './consts';
import { helloWorld } from './consts';
import { CopyButtonMode, Editor } from './editor';
import { getOptions, trackClick } from './helpers';
import { LanguageSelection } from './languageSelection';

const EditorContainer = styled(Background)(
  system.css({
    border: 1,
    borderColor: 'gray-900',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
  })
);

export const CodeByteEditor: React.FC = () => {
  const [language, setLanguage] = useState<languageOption>('');
  const [text, setText] = useState<string>('');

  const [hasBeenEdited, setHasBeenEdited] = useState(false);

  return (
    <>
        <Editor
        language={language}
        text={text}
        copyButtonMode={copyButtonMode}
        onChange={(newText: string) => {
          setText(newText);

          const { renderMode } = getOptions();
          if (!renderMode && hasBeenEdited === false) {
            setHasBeenEdited(true);
            trackClick('edit');
          }
        }}
      />
    </>
  );
};

export default CodeByteEditor;
