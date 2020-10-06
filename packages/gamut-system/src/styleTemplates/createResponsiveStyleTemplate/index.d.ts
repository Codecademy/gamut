import { CSSObject } from '@emotion/core';
import {
  StyleTemplate,
  AbstractProps,
  AbstractTheme,
} from '../../types/system';
export declare type ResponsivePropertyArguments<T extends AbstractProps> = {
  propNames: Exclude<keyof T, 'theme'>[];
  styleTemplates: Partial<Record<keyof T, StyleTemplate<T>>>;
};
export declare function createResponsiveStyleTemplate<
  Props extends {
    theme?: AbstractTheme;
  }
>({
  propNames,
  styleTemplates,
}: ResponsivePropertyArguments<Props>): (props: Props) => CSSObject;
