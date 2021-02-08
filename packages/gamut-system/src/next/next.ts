import { assign, get, isArray, isObject, merge } from 'lodash';

import { AbstractProps, AbstractTheme } from '../types/config';
import { CSSObject } from '../types/css';
import { AllProps, BaseConfig, PropKeys, StyleFn } from './types';

const safePass = <T>(props: unknown): props is T => {
  return true;
};
const handler = {
  withTheme<T extends AbstractTheme>() {
    return {
      createParser<C extends Record<string, StyleFn<T, BaseConfig<T>>>>(
        config: C
      ) {
        type Props = AllProps<C, T, true>;
        const propNames = Object.keys(config);

        const propParser = (props: Props) => {
          let styles = {};
          propNames.forEach((prop) => {
            const handler = config[prop].styleFn;
            const value = get(props, prop);
            switch (typeof value) {
              case 'string':
              case 'number':
                return assign(styles, handler(props));
              case 'object':
                if (isArray(value)) {
                  styles = merge(styles, {});
                }
                if (isObject(value)) {
                  styles = merge(styles, {});
                }
            }
          });

          return styles;
        };

        propParser.config = config;

        return propParser;
      },
      createHandler<C extends BaseConfig<T>>(config: C) {
        const { prop, scale } = config;

        const fn: StyleFn<T, C> = {
          styleFn: (props) => {
            const value = get(props, prop);
            const scaleValue = get(props, `theme.${scale}.${value}`, value);
            return {
              [prop]: scaleValue,
            };
          },
          ...config,
          propNames: (config.dependentProps || []) as PropKeys<C>[],
        };

        return fn;
      },
      withProps() {
        return {
          createVariants() {
            return <
              Keys extends string,
              Default extends Keys,
              Prop extends Readonly<string> = 'variant'
            >(config: {
              prop?: Prop;
              default?: Default;
              variants: Readonly<Record<Keys, P>>;
            }) => {
              return (
                props: Partial<Record<Prop, Keys>> & { theme: T }
              ): CSSObject => ({});
            };
          },
          createCss() {
            return (config: P) => {
              return <Returned extends { theme: T }>(
                props: Returned
              ): CSSObject => ({});
            };
          },
        };
      },
    };
  },
};

export const variance = {
  withTheme<T extends AbstractTheme>() {
    return {
      create<C extends Record<string, BaseConfig<T>>>(config: C) {
        type Props = AllProps<T, C>;
        type TransformMap = {
          [P in keyof C]: StyleFn<T, C[P]>;
        };

        const {
          createParser,
          createHandler,
          withProps,
        } = handler.withTheme<T>();
        const properties = {} as TransformMap;

        for (const prop in config) {
          const handler = createHandler(config[prop]);
          properties[prop] = handler;
          createParser();
        }

        const { createCss, createVariants } = withProps();

        const variant = createVariants();
        const css = createCss();

        return { properties, variant, css };
      },
    };
  },
};
