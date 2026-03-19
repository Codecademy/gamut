import { css, useVariance } from '@codecademy/gamut-styles';
import { forwardRef } from 'react';
import * as React from 'react';

const hiddenTextStyles = css({
  display: 'inline-block',
  fontSize: 0,
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  width: '1px',
});

/**
 * @deprecated Use `<Text>` instead with `screenreader='true'`
 */
export const HiddenText = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>((props, ref) => {
  const { rest } = useVariance(props, hiddenTextStyles);
  return <span ref={ref} {...rest} />;
});
