import { ReactNode, HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
export declare const presetThemes: {
    [i: string]: string;
};
export declare type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
    block?: boolean;
    caps?: boolean;
    children: ReactNode;
    disabled?: boolean;
    fitText?: boolean;
    flat?: boolean;
    go?: boolean;
    href?: string;
    id?: string;
    link?: boolean;
    outline?: boolean;
    rel?: string;
    round?: boolean;
    size?: 'small' | 'large';
    square?: boolean;
    target?: string;
    theme?: string;
    type?: string;
    underline?: boolean;
};
declare const Button: {
    (props: ButtonProps): JSX.Element;
    propTypes: {
        theme: PropTypes.Requireable<string>;
        size: PropTypes.Requireable<string>;
        outline: PropTypes.Requireable<boolean>;
        underline: PropTypes.Requireable<boolean>;
        link: PropTypes.Requireable<boolean>;
        caps: PropTypes.Requireable<boolean>;
        go: PropTypes.Requireable<boolean>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        block: PropTypes.Requireable<boolean>;
        className: PropTypes.Requireable<string>;
        round: PropTypes.Requireable<boolean>;
        square: PropTypes.Requireable<boolean>;
        flat: PropTypes.Requireable<boolean>;
        fitText: PropTypes.Requireable<boolean>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
    };
};
export default Button;
