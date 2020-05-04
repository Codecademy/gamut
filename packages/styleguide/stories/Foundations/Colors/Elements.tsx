import React from 'react';
import { Button, ButtonProps, Container } from '@codecademy/gamut/src';
import styles from './styles.module.scss';

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

export const CopyButton: React.FC<ButtonProps & { copyValue: string }> = ({
  children,
  copyValue,
  ...props
}) => {
  return (
    <Button {...props} onClick={() => navigator.clipboard.writeText(copyValue)}>
      {children}
    </Button>
  );
};

export const Swatch: React.FC<{ name: string; hex: string }> = ({
  name,
  hex,
}) => {
  return (
    <Container align="center" className={styles.swatchContainer} key={name}>
      <Container
        className={styles.swatch}
        style={{ backgroundColor: hex }}
        align="center"
        justify="center"
      >
        <Container
          column
          className={styles.swatchDetail}
          align="center"
          justify="spaceAround"
        >
          <span className={styles.name}>{name}</span>
          <CopyButton
            className={styles.swatchButton}
            flat
            theme="white"
            caps
            outline
            copyValue={name}
          >
            Copy Name
          </CopyButton>
          <span className={styles.hexcode}>{hex}</span>
        </Container>
      </Container>
    </Container>
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
