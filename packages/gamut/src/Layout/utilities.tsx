import { SerializedStyles, css } from '@emotion/core';
import { map, entries } from 'lodash';
import { ResponsiveProperty } from '../typings/responsive-properties';
import { breakpoints } from '@codecademy/gamut-styles/utils/variables';
import { MediaSize, ValidValues } from './types';

export function getViewport(
  mediaSize: MediaSize,
  template: string | SerializedStyles
) {
  if (mediaSize !== 'xs') {
    return css`
      @media only screen and (min-width: ${breakpoints[mediaSize]}) {
        ${template}
      }
    `;
  }
}

export function templateMediaQueries<T extends ValidValues>(
  config: ResponsiveProperty<T>,
  templateFunc: (value: T) => string | SerializedStyles
) {
  if (typeof config === 'object') {
    return map(entries(config), ([mediaSize, value]: [MediaSize, T]) => {
      return getViewport(mediaSize, templateFunc(value));
    });
  }
  return templateFunc(config);
}

export function responsiveProp<
  T extends ValidValues,
  Y extends Record<string, unknown>,
  K extends keyof Y
>(propName: K, templateFunc: (value: T) => string | SerializedStyles) {
  return (props: Y) => {
    const config = props[propName] as ResponsiveProperty<T>;
    return config ? templateMediaQueries<T>(config, templateFunc) : '';
  };
}
