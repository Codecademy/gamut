import '@emotion/react';

import isPropValid from '@emotion/is-prop-valid';
import createStyled, { CreateStyled, StyledOptions } from '@emotion/styled';

import { tags } from './constants/tags';
import { shouldForwardProp, theme } from './theme';

export * from './cache';
export * from './variables';
export * from './utilities';
export * from './theme';

export type ThemeShape = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends ThemeShape {}
}

export const styled: CreateStyled = Object.assign(
  (tag: any, options?: StyledOptions<{}>) => {
    return createStyled(tag, {
      ...options,
      shouldForwardProp: (prop: string) =>
        shouldForwardProp(prop) && options?.shouldForwardProp?.(prop),
    });
  }
);

// bind it to avoid mutating the original function
const newStyled = styled.bind({});

tags.forEach((tagName) => {
  // $FlowFixMe: we can ignore this because its exposed type is defined by the CreateStyled type
  newStyled[tagName] = newStyled(tagName);
});
