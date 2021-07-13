import React from 'react';

import { SimpleMonacoEditor } from './SimpleMonacoEditor';
import { MonacoFile } from './types';

export type MonacoEditorProps = {
  className?: string;
  file: MonacoFile;
  onChange?: (value: string) => void;
  readOnly?: boolean;
};

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  className,
  file,
  onChange,
  readOnly,
}) => {
  return (
    <SimpleMonacoEditor
      file={file}
      onChange={onChange}
      options={{}}
      setEditor={() => {}}
      setMonaco={() => {}}
    />
  );
};
