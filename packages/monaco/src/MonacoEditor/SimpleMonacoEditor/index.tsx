import loadable from '@loadable/component';
import type { editor as EditorType } from 'monaco-editor';
import React, { Component } from 'react';
import ReactResizeDetector from 'react-resize-detector';

import { Editor, MonacoFile } from '../types';

const ReactMonacoEditor = loadable(() => import('react-monaco-editor'));

export type SimpleMonacoEditorProps = {
  file: MonacoFile;
  languageId?: string;
  onChange?: (newValue: string) => void;
  options: EditorType.IStandaloneEditorConstructionOptions;
  setEditor: (editor: Editor.IStandaloneCodeEditor) => void;
  setMonaco: (monaco: any) => void;
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

  editorWillMount = (monaco: any) => {
    this.props.setMonaco(monaco);
  };

  render() {
    return (
      <ReactResizeDetector
        handleHeight
        handleWidth
        onResize={(width: any, height: any) => {
          width > 0 && height > 0 && this.editor?.layout();
        }}
        refreshMode="debounce"
        refreshRate={500}
      >
        <div data-language-id={this.props.languageId}>
          <ReactMonacoEditor
            editorDidMount={this.editorDidMount}
            editorWillMount={this.editorWillMount}
            onChange={this.props.onChange}
            options={this.props.options}
            theme={this.props.options.theme}
            value={this.props.file.content}
          />
        </div>
      </ReactResizeDetector>
    );
  }
}
