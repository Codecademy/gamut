import type { InfoTipProps } from './index';

/**
 * InfoTip props that allow both ariaLabel and ariaLabelledby to be optional.
 * Used in components that automatically provide ariaLabelledby when neither is provided.
 */
export type InfoTipPropsWithoutAria = Omit<
  InfoTipProps,
  'ariaLabel' | 'ariaLabelledby'
> & {
  ariaLabel?: string;
  ariaLabelledby?: string;
};

/**
 * Utility function to convert InfoTipPropsWithoutAria to InfoTipProps.
 * Ensures one of ariaLabel or ariaLabelledby is provided (using fallback if neither is provided).
 * Returns both the props and whether the label should be automatically labeled.
 */
export const createInfoTipProps = (
  props: InfoTipPropsWithoutAria,
  fallbackAriaLabelledby?: string
): {
  infotipProps: InfoTipProps;
  shouldLabelInfoTip: boolean;
} => {
  const { ariaLabel, ariaLabelledby, ...rest } = props;
  const hasAriaLabel = ariaLabel !== undefined;
  const hasAriaLabelledby = ariaLabelledby !== undefined;
  const shouldLabelInfoTip = !hasAriaLabel && !hasAriaLabelledby;

  if (hasAriaLabel) {
    return {
      infotipProps: {
        ...rest,
        ariaLabel,
      } as InfoTipProps,
      shouldLabelInfoTip: false,
    };
  }

  const finalAriaLabelledby = ariaLabelledby ?? fallbackAriaLabelledby;
  if (finalAriaLabelledby === undefined) {
    throw new Error(
      'InfoTip requires either ariaLabel or ariaLabelledby to be provided'
    );
  }

  return {
    infotipProps: {
      ...rest,
      ariaLabelledby: finalAriaLabelledby,
    } as InfoTipProps,
    shouldLabelInfoTip,
  };
};
