import {
  FillButton,
  StrokeButton,
  TextButton,
  ToolTip,
} from '@codecademy/gamut';
import {
  MiniArrowRightIcon,
  MiniCheckCircleIcon,
} from '@codecademy/gamut-icons';
import type { ComponentType } from 'react';
import { createElement as h, useState } from 'react';

// Components addressable by name from ButtonPlayground.vue / ButtonVariantGrid.vue.
export const buttonComponents = {
  FillButton,
  StrokeButton,
  TextButton,
} as const;

// --- Pattern demos -----------------------------------------------------
// Each pattern demonstrates real wiring (state, callbacks, composition),
// not just a prop value, per ADR 0001 ("Patterns vs. Variants").

const FillButtonSubmitPattern = () => {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleClick = () => {
    setStatus('saving');
    setTimeout(() => setStatus('saved'), 900);
  };

  return h(
    FillButton,
    {
      variant: 'primary',
      disabled: status === 'saving',
      icon: status === 'saved' ? MiniCheckCircleIcon : undefined,
      onClick: handleClick,
    },
    status === 'idle' && 'Save changes',
    status === 'saving' && 'Saving…',
    status === 'saved' && 'Saved'
  );
};

const FillButtonLinkPattern = () =>
  h(
    FillButton,
    {
      variant: 'primary',
      href: 'https://gamut.codecademy.com',
      icon: MiniArrowRightIcon,
      iconPosition: 'right',
    },
    'View the component library'
  );

const StrokeButtonFooterPattern = () => {
  const [open, setOpen] = useState(true);

  if (!open) {
    return h(
      TextButton,
      { variant: 'interface', onClick: () => setOpen(true) },
      'Reopen dialog footer'
    );
  }

  return h(
    'div',
    { style: { display: 'flex', gap: 8 } },
    h(
      StrokeButton,
      { variant: 'secondary', onClick: () => setOpen(false) },
      'Cancel'
    ),
    h(FillButton, { variant: 'primary', onClick: () => setOpen(false) }, 'Save')
  );
};

const StrokeButtonDisabledTooltipPattern = () =>
  h(
    ToolTip,
    {
      id: 'stroke-button-disabled-reason',
      info: 'Complete the previous step first',
    },
    h(
      StrokeButton,
      {
        variant: 'secondary',
        'aria-describedby': 'stroke-button-disabled-reason',
        'aria-disabled': true,
      } as any,
      'Continue'
    )
  );

const TextButtonInlinePattern = () =>
  h(
    'p',
    { style: { margin: 0, maxWidth: 420 } },
    'Your changes are saved automatically. ',
    h(TextButton, { variant: 'primary', size: 'small' }, 'View version history')
  );

const TextButtonTogglePattern = () => {
  const [expanded, setExpanded] = useState(false);

  return h(
    'div',
    null,
    h(
      TextButton,
      {
        variant: 'primary',
        icon: MiniArrowRightIcon,
        iconPosition: expanded ? 'left' : 'right',
        onClick: () => setExpanded((value) => !value),
      },
      expanded ? 'Hide details' : 'Show details'
    ),
    expanded &&
      h(
        'p',
        { style: { marginTop: 8, marginBottom: 0 } },
        'Additional detail revealed by toggling component state — the button owns open/closed state, not just a prop value.'
      )
  );
};

export const buttonPatternDemos: Record<string, ComponentType> = {
  'fill-button-submit': FillButtonSubmitPattern,
  'fill-button-link': FillButtonLinkPattern,
  'stroke-button-footer': StrokeButtonFooterPattern,
  'stroke-button-disabled-tooltip': StrokeButtonDisabledTooltipPattern,
  'text-button-inline': TextButtonInlinePattern,
  'text-button-toggle': TextButtonTogglePattern,
};
