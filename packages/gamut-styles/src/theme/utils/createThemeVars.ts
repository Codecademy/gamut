import { AbstractTheme } from '@codecademy/gamut-system';
import { get, omit } from 'lodash';

export const createThemeVars = <
  T extends AbstractTheme,
  K extends (keyof T)[],
  Registered extends Pick<T, K[number]>,
  MappedVars extends {
    [Key in keyof Registered]: {
      [Variable in keyof Registered[Key]]: any;
    };
  },
  ReturnedTheme extends T & MappedVars
>(
  theme: T,
  keys: K
): {
  vars: Record<string, any>;
  theme: ReturnedTheme;
} => {
  const vars: Record<string, string | Record<string, string>> = {};
  const themeVars = {} as Record<string, Record<string, string>>;

  keys.forEach((key: string) => {
    const varsToRegister = theme[key];
    themeVars[key] = {} as Record<string, string>;
    Object.keys(varsToRegister).forEach((variable: string) => {
      const varName = `--${variable}`;
      themeVars[key][variable] = `var(${varName})`;
      const valuesToRegister = varsToRegister[variable];

      switch (typeof valuesToRegister) {
        case 'string':
          // add static vars
          vars[varName] = valuesToRegister;
          break;
        case 'object':
          // Add vars that have responsive values
          Object.assign(vars, {
            [varName]: get(valuesToRegister, 'base'),
            ...Object.keys(omit(valuesToRegister, 'base')).reduce(
              (carry, key) => ({
                ...carry,
                [get(theme.breakpoints, key)]: {
                  [varName]: valuesToRegister[key],
                },
              }),
              {}
            ),
          });
      }
    });
  });

  return { vars, theme: { ...theme, ...themeVars } as ReturnedTheme };
};
