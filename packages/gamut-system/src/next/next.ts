import { assign, get, isArray, isObject, merge } from 'lodash';

import { AbstractTheme } from '../types/config';
import { AllProps, BaseConfig, Config, ParserFn, WithTheme } from './types';

const handler: WithTheme = {
  withTheme() {
    return {
      bindMeta(config) {
        return {
          ...config,
          propNames: [
            config.propName,
            ...(isArray(config.dependentProps) ? config.dependentProps : []),
          ],
        };
      },
      createHandler(config) {
        return {
          ...config,
          styleFn: (props) => {
            const value = get(props, config.propName);
            const scaleValue = get(
              props,
              `theme.${config.scale}.${value}`,
              value
            );
            return {
              [config.propName]: scaleValue,
            };
          },
        };
      },
      createParser(config) {
        return [
          (props) => {
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
          },
          config,
        ];
      },
      withProps() {
        return {
          createVariants() {
            return (config) => {
              return (props) => ({});
            };
          },
          createCss() {
            return (config) => {
              return (props) => ({});
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
        type HandlerProps = {
          [P in keyof C]: ParserFn<T, Config<T, C[P]>>;
        };

        const {
          bindMeta,
          createParser,
          createHandler,
          withProps,
        } = handler.withTheme<T>();
        const properties = {} as HandlerProps;

        for (const prop in config) {
          const [handler, meta] = createParser(
            createHandler(bindMeta(config[prop]))
          );

          properties[prop] = Object.assign(handler, meta);
        }

        const { createCss, createVariants } = withProps<Props>();

        const variant = createVariants();
        const css = createCss();

        return { properties, variant, css };
      },
    };
  },
};
