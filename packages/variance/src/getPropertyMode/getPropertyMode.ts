import { PropertyMode } from '../types/properties';

export const getPropertyMode = (
  useLogicalProperties: boolean
): PropertyMode => {
  return useLogicalProperties ? 'logical' : 'physical';
};
