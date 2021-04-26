import { merge } from 'lodash';

import { CSS, Parser, Prop, TransformerMap, Variant } from '../types/config';
import { CSSObject, ThemeProps } from '../types/props';
import { createCss } from './createCss';

export function createVariants<
  Config extends Record<string, Prop>,
  P extends Parser<TransformerMap<Config>>
>(config: Config): Variant<P> {
  const css: CSS<P> = createCss(config);

  return ({ prop = 'variant', defaultVariant, base = {}, variants }) => {
    type Keys = keyof typeof variants;
    const baseFn = css(base);
    const variantFns = {} as Record<Keys, (props: ThemeProps) => CSSObject>;

    Object.keys(variants).forEach((key) => {
      const variantKey = key as Keys;
      const cssProps = variants[variantKey];
      variantFns[variantKey] = css(cssProps as any);
    });

    return (props) => {
      const { [prop]: selected = defaultVariant } = props;
      const styles = {};
      if (!selected) return styles;

      return merge(
        styles,
        baseFn(props),
        variantFns?.[selected as Keys]?.(props)
      );
    };
  };
}
