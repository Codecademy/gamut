'use client';

import { FillButton } from '@codecademy/gamut';

import { ButtonPlayground } from '../ButtonPlayground';
import { ButtonVariantsGrid } from '../ButtonVariantsGrid';
import {
  type AsyncActionPatternProps,
  AsyncActionPattern,
} from '../patterns/AsyncActionPattern';

/**
 * `@codecademy/gamut`'s barrel export pulls in components that use
 * client-only hooks (Alert, BarChart, ...). Importing it must happen
 * inside a "use client" module — never at the top level of a page.mdx,
 * which Next treats as a Server Component — so these thin wrappers are
 * the only place FillButton is imported.
 */
export const FillButtonVariants = () => (
  <ButtonVariantsGrid button={FillButton} />
);

export const FillButtonPlayground = () => (
  <ButtonPlayground button={FillButton} componentName="FillButton" />
);

export const FillButtonAsyncPattern = (
  props: Omit<AsyncActionPatternProps, 'button'>
) => <AsyncActionPattern button={FillButton} {...props} />;
