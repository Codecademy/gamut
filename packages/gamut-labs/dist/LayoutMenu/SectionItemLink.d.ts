import { WithChildrenProp } from '@codecademy/gamut';
import * as React from 'react';
export interface SectionItemLinkProps extends WithChildrenProp {
    onClick: (event: React.MouseEvent) => void;
    href: string;
}
export declare const SectionItemLink: React.FC<SectionItemLinkProps>;
