import { css } from '@emotion/core';
import {
  BorderWidths,
  BorderRadii,
  BorderColors,
  borderColors,
  borderRadii,
  borderWidths,
} from '../variables/border';

export type BorderProps = {
  bordered?: boolean;
  borderWidth?: BorderWidths;
  borderRadius?: BorderRadii;
  borderColor?: BorderColors;
};

export const getBorder = (props: BorderProps) => {
  const {
    bordered,
    borderWidth = 1,
    borderRadius = 2,
    borderColor = 'base',
  } = props;

  return (
    bordered &&
    css`
      border: ${borderWidths[borderWidth]} solid ${borderColors[borderColor]};
      border-radius: ${borderRadii[borderRadius]};
    `
  );
};
