import { PropertyTypes } from '../types/properties';

export type PropertyMode = 'logical' | 'physical';

export interface DirectionalProperty {
  physical: keyof PropertyTypes;
  logical: keyof PropertyTypes;
}

export const getPropertyMode = (
  useLogicalProperties: boolean
): PropertyMode => {
  return useLogicalProperties ? 'logical' : 'physical';
};

export const resolveProperty = (
  property: DirectionalProperty,
  useLogicalProperties: boolean
): keyof PropertyTypes => {
  const mode = getPropertyMode(useLogicalProperties);
  return property[mode];
};
