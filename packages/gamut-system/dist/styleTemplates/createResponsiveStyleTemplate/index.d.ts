import { AbstractTheme, HandlerMeta } from '../../types/config';
import { CSSObject } from '../../types/system';
export declare function createResponsiveStyleTemplate<Props extends {
    theme?: AbstractTheme;
}>({ propNames, styleTemplates, }: HandlerMeta<Props>): (props: Props) => CSSObject;
