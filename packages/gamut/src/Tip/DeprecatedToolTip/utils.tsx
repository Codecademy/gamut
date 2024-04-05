import { DeprecatedToolTipProps } from './types';

export type DeprecatedToolTipAccessibiltyProps = Pick<
  DeprecatedToolTipProps,
  'focusable' | 'id'
> & {
  isOpenPopoverToolTip?: boolean;
};

export const getDeprecatedAccessibilityProps = ({
  focusable,
  id,
  isOpenPopoverToolTip,
}: DeprecatedToolTipAccessibiltyProps) => {
  // Since PopoverToolTips are removed from the DOM, when they are inactive they need an aria-label instead of aria-labelledby
  const labeling =
    isOpenPopoverToolTip === undefined || isOpenPopoverToolTip
      ? { 'aria-labelledby': id }
      : { 'aria-describedby': id };
  // ToolTips sometimes contain actual <button>s, which cannot be a child of a button.
  // This element still needs tab focus so we must use the `tabIndex=0` hack.
  return {
    ...labeling,
    role: focusable ? 'button' : undefined,
    tabIndex: focusable ? 0 : undefined,
    'aria-label': focusable ? 'tooltip' : undefined,
  };
};
