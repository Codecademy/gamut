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

  Object.keys(config).forEach(propName => {
    const propConfig = config[propName];

    switch (typeof propConfig) {
      case 'number':
      case 'string': {
        const className = styleMap[`${propName}_${propConfig}__smScreen`];
        className && classNames.push(className);
        break;
      }
      case 'object': {
        const className = Object.keys(propConfig).reduce(
          (carry, screenSize) => ({
            ...carry,
            [styleMap[
              `${propName}_${propConfig[screenSize]}__${screenSize}Screen`
            ]]: screenSize,
          }),
          {} as Record<string, string>
        );
        classNames.push(className);
        break;
      }
      default:
    }
  });
  return classNames;
};
