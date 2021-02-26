import { AbstractPropTransformer } from '../types/config';
import { AbstractTheme, BreakpointCache, CSSObject, MediaQueryMap, ThemeProps } from '../types/props';
/**
 * Destructures the themes breakpoints into an ordered structure to traverse
 */
export declare const parseBreakpoints: <T extends AbstractTheme>(theme?: T | undefined) => BreakpointCache | null;
export declare const isMediaArray: (val: unknown) => val is (string | number)[];
export declare const isMediaMap: (val: object) => val is MediaQueryMap<string | number>;
interface ResponsiveParser<Bp extends MediaQueryMap<string | number> | (string | number)[]> {
    <T extends AbstractTheme, C extends AbstractPropTransformer<T>>(value: Bp, props: ThemeProps<T>, config: C, breakpoints: Bp): CSSObject;
}
export declare const objectParser: ResponsiveParser<MediaQueryMap<string | number>>;
export declare const arrayParser: ResponsiveParser<(string | number)[]>;
export {};
