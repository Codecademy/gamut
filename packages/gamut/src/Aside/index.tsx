import { css, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import React from 'react';

// aside with one set of system props
const Aside = styled.aside(system.space);

// aside with one set of system props
const AsideWithMultipleSystemProps = styled.aside(
  variance.compose(system.layout, system.space)
);

// aside with one set of system props + css
const AsideSystemProps = variance.compose(system.layout, system.space);
const AsideStyles = css({ bg: 'background-primary', border: 1 });

const AsideWithMultipleSystemPropsandCSS = styled.aside<
  StyleProps<typeof AsideSystemProps> & StyleProps<typeof AsideStyles>
>(AsideSystemProps, AsideStyles);

// aside with spacing and
<>
  <Aside p={16}>Aside</Aside>;
  <AsideWithMultipleSystemProps width={40} p={16}>
    Aside with Multiple System Props
  </AsideWithMultipleSystemProps>
  <AsideWithMultipleSystemPropsandCSS width={40} p={16} />;
</>;
