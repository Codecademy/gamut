import { css } from '@emotion/core';
import { colors, fontFamilies } from '@codecademy/gamut-styles';

export const stepperStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: ${fontFamilies.base};
`;

export const columnStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & + & {
    margin-left: 0.7rem;
  }
`;

export type SizeType = 'mini' | 'standard' | 'long';
const sizes: Record<SizeType, number> = {
  mini: 4.5,
  standard: 5,
  long: 8,
};

export const inputStyles = (sizeType: SizeType) => {
  return css`
    border: 2px solid ${colors.gray[200]};
    border-radius: 4px;
    outline: none;
    font-size: 1.65rem;
    padding: 0.2rem 1.5rem 1rem;
    text-align: center;
    font-family: ${fontFamilies.headings};
    max-width: ${sizes[sizeType]}rem;

    /* don't show the default input spinner */
    &[type='number']::-webkit-inner-spin-button,
    &[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }
  `;
};

export const labelStyles = css`
  margin-top: -1.8rem;
  text-align: center;
  font-size: 0.9rem;
  font-family: ${fontFamilies.base};
  padding-bottom: 0.35rem;
  color: ${colors.gray[800]};
`;
