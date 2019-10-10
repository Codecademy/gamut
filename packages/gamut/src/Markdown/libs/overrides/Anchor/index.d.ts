import React, { HTMLAttributes } from 'react';
export interface AnchorProps extends HTMLAttributes<HTMLAnchorElement> {
    href: string;
    title?: string;
    height?: number;
    width?: number;
    target?: string;
    rel?: string;
}
declare const Anchor: React.FC<AnchorProps>;
export default Anchor;
