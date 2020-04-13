/**
 * Takes a prop/style configuration and templates the classes
 * to match the styleMaps classes returning a concatenated classname string
 */

import {
  ResponsiveProperty,
  OptionalResponsiveProperty,
} from '../typings/responsive-properties';

export const generateClassnames = (
  config: ResponsiveProperty<unknown> | OptionalResponsiveProperty<unknown>,
  styleMap: Record<string, string>
): string[] => {
  const styleList: string[] = [];
  Object.entries(config).forEach(([propName, propValue]) => {
    switch (typeof propValue) {
      case 'number':
      case 'string': {
        const mappedClass = styleMap[`${propName}_${propValue}__xs`];
        if (mappedClass) {
          styleList.push(mappedClass);
        }
      }
      case 'object': {
        if (propValue !== null) {
          Object.entries(propValue).forEach(([mediaSize, mediaPropValue]) => {
            const mappedClass =
              styleMap[`${propName}_${mediaPropValue}__${mediaSize}`];
            if (mappedClass) {
              styleList.push(mappedClass);
            }
          });
        }
      }
      default:
    }
  });
  return styleList;
};

export default generateClassnames;
