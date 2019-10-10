import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
export declare type GridProps = {
    children?: ReactNode | ReactNode[];
    className?: string;
    fluid?: boolean;
    tagName?: string;
};
declare const Grid: {
    (props: GridProps): React.ReactElement<string[], string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
    propTypes: {
        fluid: PropTypes.Requireable<boolean>;
        className: PropTypes.Requireable<string>;
        tagName: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
};
export default Grid;
