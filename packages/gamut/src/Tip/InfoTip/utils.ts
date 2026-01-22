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

  if (hasAriaLabel) {
    return {
      infotipProps: {
        ...rest,
        ariaLabel,
      } as InfoTipProps,
      shouldLabelInfoTip: false,
    };
  }

  if (hasAriaLabelledby) {
    return {
      infotipProps: {
        ...rest,
        ariaLabelledby,
      } as InfoTipProps,
      shouldLabelInfoTip: false,
    };
  }

  if (fallbackAriaLabelledby) {
    return {
      infotipProps: {
        ...rest,
        ariaLabelledby: fallbackAriaLabelledby,
      } as InfoTipProps,
      shouldLabelInfoTip: true,
    };
  }

  return {
    infotipProps: {
      ...rest,
    } as InfoTipProps,
    shouldLabelInfoTip: false,
  };
};
