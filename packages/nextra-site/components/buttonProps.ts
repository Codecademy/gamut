import type { PropRow } from './PropsTable';

/**
 * FillButton, StrokeButton, and TextButton all resolve to
 * `InlineIconButtonProps`, so they share one prop shape
 * (packages/gamut/src/Button/shared/types.ts, styles.ts, variants.ts).
 */
export const buttonCommonProps: PropRow[] = [
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'The button label.',
  },
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'danger' | 'interface'",
    default: 'primary',
    description:
      'The semantic intent of the action. Drives color: primary for the main action, secondary for an alternate, danger for destructive actions, interface for chrome-level controls.',
  },
  {
    name: 'size',
    type: "'small' | 'normal' | 'large'",
    default: 'normal',
    description: 'Controls height, padding, and font size.',
  },
  {
    name: 'icon',
    type: 'ComponentType<GamutIconProps>',
    description:
      'A mini icon component (from @codecademy/gamut-icons) rendered alongside the label.',
  },
  {
    name: 'iconPosition',
    type: "'left' | 'right'",
    default: 'left',
    description: 'Where the icon renders relative to the label.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description:
      'Disables the button. When combined with href, the element renders as a non-interactive element instead of an anchor.',
  },
  {
    name: 'href',
    type: 'string',
    description:
      'If defined (and the button is not disabled), the button renders as an <a> element instead of a <button>.',
  },
  {
    name: 'onClick',
    type: '(event: MouseEvent) => void',
    description: 'Standard click handler.',
  },
  {
    name: 'mode',
    type: "'light' | 'dark' | 'inverted' | ...",
    description:
      'Overrides the ambient color mode for this button. See Concepts → Color modes.',
  },
  {
    name: 'as',
    type: 'never',
    description:
      'Not supported on this component — element type is determined by href/disabled, not by `as`.',
  },
];
