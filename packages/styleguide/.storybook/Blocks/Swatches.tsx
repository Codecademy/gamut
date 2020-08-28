import React from 'react';
import { styled } from '@storybook/theming';
import { colors, swatches } from '@codecademy/gamut-styles';
import { meetsContrastGuidelines, parseToHsl } from 'polished';

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
  darkText = colors.navy
) => {
  const darkContrast = meetsContrastGuidelines(background, darkText);
  const lightContrast = meetsContrastGuidelines(background, lightText);
  if (lightContrast.AAA) {
    return lightText;
  }
  if (darkContrast.AAA) {
    return darkText;
  }
  if (lightContrast.AA) {
    return lightText;
  }
  if (darkContrast.AA) {
    return darkText;
  }
  // fallback
  if (meetsContrastGuidelines(background, colors.black).AA) {
    return colors.black;
  }
  throw new Error(
    `Neither dark (${darkText}) or light (${lightText}) text color meet AA requirements for contrast on a ${background} colored background`
  );
};

const SwatchContainer = styled.div<{ hex: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 125px;
  width: 100%;
  max-width: 100%;
  color: ${({ hex }) => textColor(hex)};
  background-color: ${({ hex }) => hex};
  border: 1px solid ${swatches.gray[800]};
  border-bottom: 0;

  &:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-of-type {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom: 1px solid ${swatches.gray[800]};
  }
`;

const SwatchDetail = styled.div`
  color: inherit;
  padding: 0.2rem 0.5rem;
  font-weight: bold;
  font-size: 13px;
`;

export const Swatch: React.FC<{
  name: string;
  hex: string;
  alias?: string;
}> = ({ name, alias, hex }) => {
  const hsl = parseToHsl(hex);
  return (
    <SwatchContainer hex={hex}>
      <SwatchDetail>{name}</SwatchDetail>
      <SwatchDetail>
        {Object.keys(hsl).map((k) => (
          <div key={k}>{`${k[0]}: ${Math.round(1000 * hsl[k]) / 1000}`}</div>
        ))}
      </SwatchDetail>
      <SwatchDetail>{hex}</SwatchDetail>
    </SwatchContainer>
  );
};

export const SwatchPalette: React.FC<{
  data: any;
  variablePrefix: string;
}> = ({ data, variablePrefix }) => {
  return (
    <>
      {Object.keys(data).map((variableSuffix) => {
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
