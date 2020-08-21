import React from 'react';
import { styled } from '@storybook/theming';
import { colors } from '@codecademy/gamut-styles';
import chroma from 'chroma-js';

export const parseCamelCase = (string: string) =>
  string.replace(/([a-zA-Z])(?=[A-Z0-9])/g, '$1-').toLowerCase();

export function objectKeys<T>(object: T) {
  return Object.keys(object) as (keyof T)[];
}

export const getSassVariableName = (
  variablePrefix: string,
  variableSuffix: string
) => {
  if (variablePrefix) {
    return `$${parseCamelCase(variablePrefix)}-${parseCamelCase(
      variableSuffix
    )}`;
  }
  return `$color-${parseCamelCase(variableSuffix)}`;
};

const textColor = (
  background: string,
  lightText = colors.white,
  darkText = colors.standard.navy
) => {
  if (chroma.contrast(background, lightText) >= 7) {
    return lightText;
  }
  if (chroma.contrast(background, darkText) >= 7) {
    return darkText;
  }
  if (chroma.contrast(background, lightText) >= 4.5) {
    return lightText;
  }
  if (chroma.contrast(background, darkText) >= 4.5) {
    return darkText;
  }
  // fallback
  if (chroma.contrast(background, colors.black) >= 4.5) {
    return colors.black;
  }
  throw new Error(
    `Neither dark (${darkText}) or light (${lightText}) text color meet AA requirements for contrast on a ${background} colored background`
  );
};

const SwatchContainer = styled.div<{ hex: string }>`
  position: relative;
  display: flex;
  height: 125px;
  width: 100%;
  max-width: 100%;
  color: ${({ hex }) => textColor(hex)};
  background-color: ${({ hex }) => hex};
  border: 1px solid ${colors.gray[800]};
  border-bottom: 0;

  &:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-of-type {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom: 1px solid ${colors.gray[800]};
  }
`;

const SwatchDetail = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  color: inherit;
  padding: 5px 10px;
  font-weight: bold;
  font-size: 13px;

  ${new Array(3).fill('x').map((val, index) => {
    return `
    &:nth-child(${index + 1}) {
      transform: translate(0, ${-100 * index}%);
    }
    `;
  })}
`;

export const Swatch: React.FC<{ name: string; hex: string }> = ({
  name,
  hex,
}) => {
  return (
    <SwatchContainer hex={hex}>
      <SwatchDetail>{name}</SwatchDetail>
      <SwatchDetail>{hex.toUpperCase()}</SwatchDetail>
    </SwatchContainer>
  );
};

export const SwatchPalette: React.FC<{
  data: any;
  variablePrefix: string;
}> = ({ data, variablePrefix }) => {
  return (
    <>
      {Object.keys(data)
        .sort(
          (a, b) =>
            chroma.contrast(data[a], 'white') -
            chroma.contrast(data[b], 'white')
        )
        .map((variableSuffix) => {
          const sassVariableName = getSassVariableName(
            variablePrefix,
            variableSuffix
          );
          const hexcode = data[variableSuffix];

          return (
            <Swatch
              key={sassVariableName}
              name={sassVariableName}
              hex={hexcode}
            />
          );
        })}
    </>
  );
};
