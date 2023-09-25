import { Alert } from '@codecademy/gamut/src/Alert';
import { ComponentProps } from 'react';
declare type AlertProps = Required<ComponentProps<typeof Alert>>;
declare type LimitedCTAProps = 'target' | 'href' | 'children' | 'onClick' | 'text';
export declare type PageAlert = {
    cta?: {
        [Prop in Extract<keyof AlertProps['cta'], LimitedCTAProps>]?: AlertProps['cta'][Prop];
    };
    onClose?: () => void;
    type: AlertProps['type'];
    message: string;
    permanent?: boolean;
};
export {};
