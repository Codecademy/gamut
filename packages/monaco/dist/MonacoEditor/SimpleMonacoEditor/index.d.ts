import type { editor as EditorType } from 'monaco-editor';
import { Component } from 'react';
import { Editor, Monaco, MonacoFile } from '../types';
export declare type SimpleMonacoEditorProps = {
    file: MonacoFile;
    languageId?: string;
    onChange?: (newValue: string) => void;
    options: EditorType.IStandaloneEditorConstructionOptions;
    setEditor: (editor: Editor.IStandaloneCodeEditor) => void;
    setMonaco: (monaco: Monaco) => void;
};
export declare class SimpleMonacoEditor extends Component<SimpleMonacoEditorProps> {
    editor?: Editor.IStandaloneCodeEditor;
    shouldComponentUpdate(prevProps: SimpleMonacoEditorProps): boolean;
    editorDidMount: (editor: Editor.IStandaloneCodeEditor) => void;
    editorWillMount: (monaco: Monaco) => void;
    render(): JSX.Element;
}
