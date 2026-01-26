import type { InfoTipBaseProps, InfoTipProps } from './index';

type InfoTipAriaLabel = InfoTipBaseProps & {
  ariaLabel?: string;
  ariaLabelledby?: never;
};

type InfoTipAriaLabelledby = InfoTipBaseProps & {
  ariaLabel?: never;
  ariaLabelledby?: string;
};

type InfoTipPropsAriaWithFallback = InfoTipBaseProps & {
  ariaLabel?: never;
  ariaLabelledby?: never;
};

/**
 * InfoTip props that allow both ariaLabel and ariaLabelledby to be optional.
 * Used in components that automatically provide ariaLabelledby when neither is provided.
 */
export type InfoTipSubComponentProps =
  | InfoTipAriaLabel
  | InfoTipAriaLabelledby
  | InfoTipPropsAriaWithFallback;

export const createInfoTipProps = (
  props: InfoTipSubComponentProps,
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
