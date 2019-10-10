import { HTMLProps, ReactNode } from 'react';
import PropTypes from 'prop-types';
export declare type ButtonBaseProps = (HTMLProps<HTMLLinkElement> | HTMLProps<HTMLButtonElement>) & {
    children?: ReactNode;
    className?: string;
    href?: string;
    link?: boolean;
    onClick?: (event: object) => void;
};
declare const ButtonBase: {
    (props: ButtonBaseProps): JSX.Element;
    propTypes: {
        children: PropTypes.Validator<PropTypes.ReactNodeLike>;
        className: PropTypes.Requireable<string>;
        href: PropTypes.Requireable<string>;
        link: PropTypes.Requireable<boolean>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
    };
};
export default ButtonBase;
