'use client';

import { StrokeButton } from '@codecademy/gamut';

import { ButtonPlayground } from '../ButtonPlayground';
import { ButtonVariantsGrid } from '../ButtonVariantsGrid';
import {
  type ConfirmPatternProps,
  ConfirmPattern,
} from '../patterns/ConfirmPattern';

/**
 * See FillButtonDemo.tsx for why the `@codecademy/gamut` import must
 * live inside a "use client" module rather than at the top of a
 * page.mdx.
 */
export const StrokeButtonVariants = () => (
  <ButtonVariantsGrid button={StrokeButton} />
);

export const StrokeButtonPlayground = () => (
  <ButtonPlayground button={StrokeButton} componentName="StrokeButton" />
);

export const StrokeButtonConfirmPattern = (
  props: Omit<ConfirmPatternProps, 'button'>
) => <ConfirmPattern button={StrokeButton} {...props} />;
