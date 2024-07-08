import { system } from '@codecademy/gamut-styles';
import { AbstractPropTransformer } from '@codecademy/variance/types/config';

const { css, variant, states, margin, padding, ...groups } = system;

export const PROP_GROUPS = groups;

export type PropGroups = keyof typeof PROP_GROUPS;

export const PROP_MAP = Object.entries(groups).reduce(
  (carry, [key, handler]: [string, (typeof groups)[keyof typeof groups]]) => {
    return { ...carry, ...handler.config };
  },
  {} as Record<string, AbstractPropTransformer>
);

export const ALL_PROPS = Object.keys(PROP_MAP);
