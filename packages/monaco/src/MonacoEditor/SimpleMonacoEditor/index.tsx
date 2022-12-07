import styled from '@emotion/styled';
import type { editor as EditorType } from 'monaco-editor';
import { Component } from 'react';
import ReactMonacoEditor from 'react-monaco-editor';
import ReactResizeDetector from 'react-resize-detector';

import { Editor, Monaco, MonacoFile } from '../types';

const InnerEditor = styled.div`
  padding-top: 0.95rem;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export type SimpleMonacoEditorProps = {
  file: MonacoFile;
  languageId?: string;
  onChange?: (newValue: string) => void;
  options: EditorType.IStandaloneEditorConstructionOptions;
  setEditor: (editor: Editor.IStandaloneCodeEditor) => void;
  setMonaco: (monaco: Monaco) => void;
};

export class SimpleMonacoEditor extends Component<SimpleMonacoEditorProps> {
  editor?: Editor.IStandaloneCodeEditor;

  shouldComponentUpdate(prevProps: SimpleMonacoEditorProps) {
    return (
      this.props.file !== prevProps.file ||
      this.props.languageId !== prevProps.languageId
    );
  }

  editorDidMount = (editor: Editor.IStandaloneCodeEditor) => {
    this.editor = editor;
    this.props.setEditor(editor);
  };

  editorWillMount = (monaco: Monaco) => {
    this.props.setMonaco(monaco);
  };

  render() {
    return (
      <ReactResizeDetector
        handleHeight
        handleWidth
        onResize={(width: number, height: number) => {
          if (width > 0 && height > 0) {
            this.editor?.layout();
          }
        }}
        refreshMode="debounce"
        refreshRate={500}
      >
        <InnerEditor data-language-id={this.props.languageId}>
          <ReactMonacoEditor
            editorDidMount={this.editorDidMount}
            editorWillMount={this.editorWillMount}
            onChange={this.props.onChange}
            options={this.props.options}
            theme={this.props.options.theme}
            value={this.props.file.content}
          />
        </InnerEditor>
      </ReactResizeDetector>
    );
  }
}
