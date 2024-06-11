import { states, variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { Anchor } from '../Anchor';
import { FlexBox } from '../Box';
import { FillButton, StrokeButton, TextButton } from '../Button';

const DisclosureWrapperBase = styled(FlexBox)(
  variant({
    defaultVariant: 'default',
    base: {
      width: '100%',
      maxHeight: 'fit-content',
    },
    variants: {
      default: {
        bg: 'background',
      },
      subtle: {
        bg: 'background-selected',
      },
      transparent: {
        bg: 'background-current',
      },
    },
  })
  // TS complains when I try to do this, so created a separate styled component below
  // states({
  //   hasBorder: {
  //     border: 1,
  //   },
  // })
);

export const DisclosureWrapper = styled(DisclosureWrapperBase)(
  states({
    hasBorder: {
      border: 1,
    },
  })
);

// const DisclosureWrapperVariants = variant({
//   defaultVariant: 'default',
//   base: {
//     width: '100%',
//     maxHeight: 'fit-content',
//   },
//   variants: {
//     default: {
//       bg: 'background',
//     },
//     subtle: {
//       bg: 'background-selected',
//     },
//     transparent: {
//       bg: 'background-current',
//     },
//   }
// })
// const DisclosureWrapperStates = states({
//   hasBorder: {
//     border: 1
//   },
// })

// export const DisclosureWrapper = styled(FlexBox)(DisclosureWrapperVariants, DisclosureWrapperStates)

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
        bg: 'inherit',
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
