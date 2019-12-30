import {
  get,
  map,
  compose,
  cond,
  always,
  stubTrue,
  isString,
  isNumber,
  isObject,
  keys,
} from 'lodash/fp';

export const computeClasses = (
  config: string | number | Record<string, string | number>,
  propName: string,
  styleMap: Record<string, string>
) => {
  const defaultMapper = always([styleMap[`${propName}_smScreen__${config}`]]);
  const screenSizeMapper = compose(
    map(
      (screenSize: string) =>
        styleMap[`${propName}_${screenSize}Screen__${get(screenSize, config)}`]
    ),
    keys
  );
  const computer = cond([
    [isNumber, defaultMapper],
    [isString, defaultMapper],
    [isObject, screenSizeMapper],
    [stubTrue, always([])],
  ]);

  return computer(config);
};
