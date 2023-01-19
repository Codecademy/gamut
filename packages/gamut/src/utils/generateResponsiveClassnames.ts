/**
 * Takes a prop/style configuration and templates the classes
 * to match the styleMaps classes returning a concatenated classname string
 */

import {
  OptionalResponsiveProperty,
  ResponsiveProperty,
} from '../typings/responsive-properties';

export const generateResponsiveClassnames = (
  config:
    | ResponsiveProperty<Record<string, unknown>>
    | OptionalResponsiveProperty<Record<string, unknown>>,
  styleMap: Record<string, string>
): string[] => {
  const styleList: string[] = [];

  Object.entries(config).forEach(([propName, propValue]) => {
    switch (typeof propValue) {
      case 'number':
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Fallthrough case in switch.
      case 'string': {
        const mappedClass = styleMap[`${propName}_${propValue}__xs`];
        if (mappedClass) {
          styleList.push(mappedClass);
        }
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Fallthrough case in switch.
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
