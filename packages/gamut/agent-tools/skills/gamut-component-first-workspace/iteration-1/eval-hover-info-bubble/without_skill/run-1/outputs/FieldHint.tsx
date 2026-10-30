import { ButtonBaseElements, IconButton } from '@codecademy/gamut';
import { MiniInfoOutlineIcon } from '@codecademy/gamut-icons';
import { ComponentProps, forwardRef } from 'react';

export type FieldHintProps = Omit<
  ComponentProps<typeof IconButton>,
  'icon' | 'tip' | 'children'
> & {
  /**
   * The explanatory text shown in the floating hint bubble when the trigger
   * icon is hovered or focused.
   */
  hint: string;
  /**
   * Accessible label for the hint icon. Defaults to the hint text itself,
   * but ideally should be overridden with something more specific, e.g.
   * "More information about password requirements".
   */
  'aria-label'?: string;
};

/**
 * `FieldHint` is a small info icon meant to sit next to a form field's
 * label. Hovering or focusing (via mouse, keyboard, or screen reader) the
 * icon reveals a floating bubble containing extra explanatory text about
 * the field, without permanently taking up layout space the way inline
 * help text would.
 *
 * It's a thin, opinionated wrapper around `IconButton` + `ToolTip` (the
 * same hover/focus tip primitive used for things like copy-to-clipboard
 * buttons), so it inherits their positioning, accessibility, and animation
 * behavior for free.
 *
 * @example
 * <FlexBox alignItems="center" gap={4}>
 *   <FormGroupLabel htmlFor="password">Password</FormGroupLabel>
 *   <FieldHint
 *     aria-label="More information about password requirements"
 *     hint="Must be at least 8 characters and include a number."
 *   />
 * </FlexBox>
 */
export const FieldHint = forwardRef<ButtonBaseElements, FieldHintProps>(
  (
    {
      hint,
      'aria-label': ariaLabel,
      size = 'small',
      variant = 'secondary',
      tipProps,
      ...rest
    },
    ref
  ) => {
    return (
      <IconButton
        {...rest}
        aria-label={ariaLabel ?? hint}
        icon={MiniInfoOutlineIcon}
        ref={ref}
        size={size}
        tip={hint}
        tipProps={{
          alignment: 'top-center',
          placement: 'floating',
          ...tipProps,
        }}
        type="button"
        variant={variant}
      />
    );
  }
);

FieldHint.displayName = 'FieldHint';
