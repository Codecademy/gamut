import * as React from 'react';
import { UseFormReturn, Validate } from 'react-hook-form';
declare type AvatarChooserProps = {
    src: string;
    name?: string;
    register?: UseFormReturn['register'];
    onImageChanged?: (imageFileList: FileList) => void;
    validate?: Validate<FileList> | Record<string, Validate<FileList>>;
    error?: string;
};
export declare const AvatarChooser: React.FC<AvatarChooserProps>;
export {};
