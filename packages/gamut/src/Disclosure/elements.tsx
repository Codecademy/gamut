import { states, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { Anchor } from '../Anchor';
import { FlexBox } from '../Box';
import { FillButton, StrokeButton, TextButton } from '../Button';

const disclosureWrapperVariants = variant({
  defaultVariant: 'default',
  base: {
    width: '100%',
    maxHeight: 'fit-content',
    borderRadius: 'md',
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
});

const disclosureWrapperStates = states({
  hasBorder: {
    border: 1,
  },
});

type DisclosureWrapperStateProps = StyleProps<typeof disclosureWrapperStates>;
type DisclosureWrapperVariantProps = StyleProps<
  typeof disclosureWrapperVariants
>;
export type DisclosureWrapperStyles = DisclosureWrapperStateProps &
  DisclosureWrapperVariantProps;

export const DisclosureWrapper = styled(FlexBox)<DisclosureWrapperStyles>(
  disclosureWrapperStates,
  disclosureWrapperVariants
);

export const DisclosureButtonWrapper = styled(Anchor)(
  variant({
    prop: 'isWrapper',
    defaultVariant: 'default',
    base: {
      borderRadius: 'md',
    },
    variants: {
      default: {
        bg: 'inherit',
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

const disclosureBodyWrapperStates = states({
  hasPanelBg: {
    bg: 'background-selected',
    p: 8,
  },
});

export type DisclosureBodyWrapperStyles = StyleProps<
  typeof disclosureBodyWrapperStates
>;

export const DisclosureBodyWrapper = styled(
  FlexBox
)<DisclosureBodyWrapperStyles>(disclosureBodyWrapperStates);
