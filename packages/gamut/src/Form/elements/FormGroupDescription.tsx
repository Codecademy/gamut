import { css, useVariance } from '@codecademy/gamut-styles';
import { forwardRef, HTMLAttributes } from 'react';

import { formBaseStyles } from '../styles';

export const FormGroupDescription = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { rest } = useVariance(props, css(formBaseStyles));
  return <div ref={ref} {...rest} />;
});
