import { assign, get, isArray, isObject, merge } from 'lodash';

import { AbstractProps, AbstractTheme } from '../types/config';
import { CSSObject } from '../types/css';
import { AllProps, BaseConfig, ParserFn, StyleFn } from './types';

const handler = {
  withTheme<T extends AbstractTheme>() {
    return {
      createParser<Config extends BaseConfig<T>, Fn extends StyleFn<T, Config>>(
        config: Fn
      ) {
        const propParser = ((props) => {
          let styles = {};
          config.propNames.forEach((prop) => {
            const handler = config.styleFn;
            const value = get(props, `${prop}`);
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
        }) as ParserFn<T, Config>;

        return Object.assign(propParser, config);
      },
      createHandler<C extends BaseConfig<T>>(config: C) {
        const { propName: prop, scale } = config;

        const fn: StyleFn<T, C> = {
          styleFn: (props) => {
            const value = get(props, prop);
            const scaleValue = get(props, `theme.${scale}.${value}`, value);
            return {
              [prop]: scaleValue,
            };
          },
          ...config,
          propNames: [
            prop,
            ...(isArray(config.dependentProps) ? config.dependentProps : []),
          ],
        };

        return this.createParser(fn);
      },
      withProps<P extends AbstractProps>() {
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
          [P in keyof C]: ParserFn<T, C[P]>;
        };
        const { createHandler, withProps } = handler.withTheme<T>();
        const properties = {} as TransformMap;

        for (const prop in config) {
          const handler = createHandler(config[prop]);
          properties[prop] = handler;
        }

        const { createCss, createVariants } = withProps<Props>();

        const variant = createVariants();
        const css = createCss();

        return { properties, variant, css };
      },
    };
  },
};
