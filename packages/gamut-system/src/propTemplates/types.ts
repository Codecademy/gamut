import { PropertyConfig } from '../types/props';

export type TemplateConfig = PropertyConfig &
  Required<Pick<PropertyConfig, 'propName' | 'computeValue'>>;
