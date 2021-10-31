
import { Background, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box } from '@codecademy/gamut';

import type { CopyButtonMode, languageOption } from './consts';
import { helloWorld } from './consts';

interface CodeByteEditorProps {
  language?: languageOption;
  text?: string;
  copyButtonMode?: CopyButtonMode;
}

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

export const CodeByteEditor: React.FC<CodeByteEditorProps> = (props) => {
  const [language, setLanguage] = useState<languageOption>(props.language);
  const [text, setText] = useState<string>(props.text);
  const [hasBeenEdited, setHasBeenEdited] = useState(false);

  return (
    <>{language ?
      <Box>Editor</Box> :
      <Box>Language</Box>
       }
    </>
  );
};

export default CodeByteEditor;
