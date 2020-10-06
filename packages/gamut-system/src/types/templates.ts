import { CSSObject } from '@emotion/core';
import { ComputeValue } from './props';
import { SystemScales } from './scales';

export type TemplateFactorySettings<Props extends Record<string, unknown>> = {
  computeValue: ComputeValue;
  propName: keyof Props;
  scale: SystemScales;
};

export type StyleTemplate<Props extends Record<string, unknown>> = (
  props: Props
) => CSSObject | undefined;
