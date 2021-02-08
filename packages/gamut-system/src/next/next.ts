import { get } from 'lodash';

import { AbstractTheme } from '../types/config';
import { CSSObject } from '../types/css';
import { AllProps, BaseConfig, StyleFn } from './types';

const handler = {
  withTheme<T extends AbstractTheme>() {
    return {
      createVariants<Props>() {
        return <
          Keys extends string,
          Default extends Keys,
          Prop extends Readonly<string> = 'variant'
        >(config: {
          prop?: Prop;
          default?: Default;
          variants: Readonly<Record<Keys, Props>>;
        }) => {
          return (
            props: Partial<Record<Prop, Keys>> & { theme: T }
          ): CSSObject => ({});
        };
      },
      createCss<Props>() {
        return (config: Props) => {
          return <Returned extends { theme: T }>(
            props: Returned
          ): CSSObject => ({});
        };
      },
      createHandler<C extends BaseConfig<T>>(config: C) {
        const { prop, scale } = config;

        const styleFn: StyleFn<T, C> = (props) => {
          const value = get(props, prop);
          const scaleValue = get(props, ['theme', scale, value], value);
          return {
            [prop]: scaleValue,
          };
        };

        styleFn.config = config;

        return styleFn;
      },
    };
  },
};

export const variance = {
  withTheme<T extends AbstractTheme>() {
    return {
      create<C extends Record<string, BaseConfig<T>>>(config: C) {
        const {
          createVariants,
          createCss,
          createHandler,
        } = handler.withTheme<T>();

        type Props = AllProps<T, C>;

        const properties = {} as {
          [P in keyof C]: StyleFn<T, C[P]>;
        };

        for (const prop in config) {
          properties[prop] = createHandler(config[prop]);
        }

        const variant = createVariants<Props>();
        const css = createCss<Props>();

        return { properties, variant, css };
      },
    };
  },
};
