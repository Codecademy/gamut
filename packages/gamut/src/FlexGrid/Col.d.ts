import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
export declare type ColProps = {
    xs?: boolean | number;
    sm?: boolean | number;
    md: boolean | number;
    lg: boolean | number;
    xsOffset?: number;
    smOffset?: number;
    mdOffset?: number;
    lgOffset?: number;
    tagName?: string;
    className?: string;
    reverse?: boolean;
    children?: ReactNode;
};
declare const Col: {
    (props: ColProps): React.ReactElement<string[], string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
    propTypes: {
        xs: PropTypes.Requireable<number | boolean>;
        sm: PropTypes.Requireable<number | boolean>;
        md: PropTypes.Requireable<number | boolean>;
        lg: PropTypes.Requireable<number | boolean>;
        xsOffset: PropTypes.Requireable<number>;
        smOffset: PropTypes.Requireable<number>;
        mdOffset: PropTypes.Requireable<number>;
        lgOffset: PropTypes.Requireable<number>;
        reverse: PropTypes.Requireable<boolean>;
        className: PropTypes.Requireable<string>;
        tagName: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
};
export default Col;
