/**
 * Takes a prop/style configuration and templates the classes
 * to match the styleMaps classes returning a concatenated classname string
 */
export type ClassList = (string | Record<string, unknown>)[];

export const createClassnames = (
  config: Record<string, string | number | Record<string, string | number>>,
  styleMap: Record<string, string>
): ClassList => {
  const classNames: ClassList = [];

  Object.entries(config).map(([propName, propValue]) => {
    switch (typeof propValue) {
      case 'number':
      case 'string': {
        return styleMap[`${propName}_${propValue}__smScreen`];
      }
      case 'object': {
        return Object.entries(propValue).map(
          ([mediaSize, mediaPropValue]) =>
            styleMap[`${propName}_${mediaPropValue}__${mediaSize}Screen`],
          {} as Record<string, string>
        );
      }
      default:
    }
  });
  return classNames;
};
