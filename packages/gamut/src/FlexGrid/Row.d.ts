import React from 'react';
import PropTypes from 'prop-types';
export declare type RowProps<TElement extends HTMLElement = HTMLElement> = {
    className?: string;
    reverse?: boolean;
    tagName?: TElement['tagName'];
};
declare const Row: {
    <TElement extends HTMLElement = HTMLDivElement>(props: RowProps<TElement>): React.ReactElement<string[], string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
    propTypes: {
        reverse: PropTypes.Requireable<boolean>;
        start: PropTypes.Requireable<string>;
        center: PropTypes.Requireable<string>;
        end: PropTypes.Requireable<string>;
        top: PropTypes.Requireable<string>;
        middle: PropTypes.Requireable<string>;
        bottom: PropTypes.Requireable<string>;
        around: PropTypes.Requireable<string>;
        between: PropTypes.Requireable<string>;
        first: PropTypes.Requireable<string>;
        last: PropTypes.Requireable<string>;
        className: PropTypes.Requireable<string>;
        tagName: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
};
export default Row;
