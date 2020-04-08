/**
 * Takes a prop/style configuration and templates the classes
 * to match the styleMaps classes returning a concatenated classname string
 */

export const createClassnames = (
  config: Record<string, string | number | Record<string, string | number>>,
  styleMap: Record<string, string>
): (string | string[])[] => {
  return Object.entries(config).map(([propName, propValue]) => {
    switch (typeof propValue) {
      case 'number':
      case 'string': {
        return styleMap[`${propName}_${propValue}__xsScreen`];
      }
      case 'object': {
        return Object.entries(propValue).map(
          ([mediaSize, mediaPropValue]) =>
            styleMap[`${propName}_${mediaPropValue}__${mediaSize}Screen`]
        );
      }
    }
  });
};
