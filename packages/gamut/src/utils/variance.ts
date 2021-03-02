import { theme } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import isPropValid from '@emotion/is-prop-valid';

export const props = variance.withTheme(theme);

export const createStyledConfig = (invalidProps: string[]) => ({
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) && !invalidProps.includes(prop),
});
