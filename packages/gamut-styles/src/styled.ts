import unthemedStyled, { CreateStyled } from '@emotion/styled';
import { Theme } from './theme';

export const styled = unthemedStyled as CreateStyled<Theme>;
