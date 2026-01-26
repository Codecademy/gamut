import { useId } from 'react';

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

/**
 * Hook to handle infotip props and accessibility labeling.
 * Extracts the common pattern used by Radio, Checkbox, and FormGroupLabel components.
 *
 * @param infotip - Optional infotip subcomponent props
 * @returns Object containing infotipProps, labelId, and shouldLabelInfoTip flag
 */
export const useInfotipProps = (infotip?: InfoTipSubComponentProps) => {
  const labelId = useId();
  const { infotipProps, shouldLabelInfoTip } = infotip
    ? createInfoTipProps(infotip, labelId)
    : {
        infotipProps: undefined as InfoTipProps | undefined,
        shouldLabelInfoTip: false,
      };

  return { infotipProps, labelId, shouldLabelInfoTip };
};
