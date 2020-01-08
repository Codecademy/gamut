export const computeClasses = (
  config: string | number | Record<string, string | number>,
  propName: string,
  styleMap: Record<string, string>
) => {
  switch (typeof config) {
    case 'number':
    case 'string':
      return [styleMap[`${propName}_smScreen__${config}`]];
    case 'object':
      return Object.keys(config).map(
        (screenSize: string) =>
          styleMap[`${propName}_${screenSize}Screen__${config[screenSize]}`]
      );
    default:
      return [];
  }
};
