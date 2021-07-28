import React from 'react';
import { MonacoFile } from './types';
export declare type MonacoEditorProps = {
    className?: string;
    file: MonacoFile;
    onChange?: (value: string) => void;
    readOnly?: boolean;
};
export declare const MonacoEditor: React.FC<MonacoEditorProps>;
