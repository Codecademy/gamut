/**
 * Takes a prop/style configuration and templates the classes
 * to match the styleMaps classes returning a concatenated classname string
 */
export const createClassnames = (
  config: Record<string, string | number | Record<string, string | number>>,
  styleMap: Record<string, string>
): string => {
  const classNames: string[] = [];
  Object.keys(config).forEach(propName => {
    const propConfig = config[propName];
    switch (typeof propConfig) {
      case 'number':
      case 'string':
        const className = styleMap[`${propName}_${propConfig}__smScreen`];
        className && classNames.push(className);
        break;
      case 'object':
        Object.keys(propConfig).forEach((screenSize: string) => {
          const mediaConfig = propConfig[screenSize];
          const className =
            styleMap[`${propName}_${mediaConfig}__${screenSize}Screen`];
          className && classNames.push(className);
        });
        break;
      default:
    }
  });
  return classNames.join(' ');
};
