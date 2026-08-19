'use client';

import { TextButton } from '@codecademy/gamut';

import { ButtonPlayground } from '../ButtonPlayground';
import { ButtonVariantsGrid } from '../ButtonVariantsGrid';
import {
  type AsyncActionPatternProps,
  AsyncActionPattern,
} from '../patterns/AsyncActionPattern';

/**
 * See FillButtonDemo.tsx for why the `@codecademy/gamut` import must
 * live inside a "use client" module rather than at the top of a
 * page.mdx.
 */
export const TextButtonVariants = () => (
  <ButtonVariantsGrid button={TextButton} />
);

export const TextButtonPlayground = () => (
  <ButtonPlayground button={TextButton} componentName="TextButton" />
);

export const TextButtonAsyncPattern = (
  props: Omit<AsyncActionPatternProps, 'button'>
) => <AsyncActionPattern button={TextButton} {...props} />;
