import { states, variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { Anchor } from '../Anchor';
import { FlexBox } from '../Box';
import { FillButton, StrokeButton, TextButton } from '../Button';

export const DisclosureWrapper = styled(FlexBox)(
  variant({
    defaultVariant: 'default',
    base: {
      width: '100%',
    },
    variants: {
      default: {
        bg: 'background-current',
        border: 1,
        maxHeight: 'fit-content',
      },
      block: {
        bg: 'background',
        border: 'none',
      },
    },
  })
);

export const DisclosureButtonWrapper = styled(Anchor)(
  variant({
    prop: 'appearance',
    defaultVariant: 'default',
    base: {
      '&:hover': {
        color: 'text',
        bg: 'background-hover',
      },
      '&:focus': {
        color: 'text',
        bg: 'background-selected',
      },
      '&:disabled': {
        color: 'text-disabled',
        bg: 'background-disabled',
      },
    },
    // Don't actually need the variant here, but it errors out if omitted
    variants: {
      default: {
        bg: 'background-current',
      },
      block: {
        bg: 'background',
        border: 'none',
      },
    },
  })
);

const sharedVariants = {
  left: {
    alignSelf: 'flex-start',
    justifyContent: 'left',
  },
  right: {
    alignSelf: 'flex-end',
    justifyContent: 'right',
  },
};

export const StyledTextButton = styled(TextButton)(
  variant({
    prop: 'placement',
    variants: sharedVariants,
  })
);

export const StyledStrokeButton = styled(StrokeButton)(
  variant({
    prop: 'placement',
    variants: sharedVariants,
  })
);

export const StyledFillButton = styled(FillButton)(
  variant({
    prop: 'placement',
    variants: sharedVariants,
  })
);

export const DisclosureBodyWrapper = styled(FlexBox)(
  states({
    hasPanelBg: {
      bg: 'background-selected',
      p: 8,
    },
  })
);
