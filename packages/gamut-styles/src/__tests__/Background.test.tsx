import { matchers } from '@emotion/jest';
import { ThemeProvider, useTheme } from '@emotion/react';
import { setupRtl as setupRtlBase } from 'component-test-setup';
import overArgs from 'lodash/overArgs';
import * as React from 'react';

import { Background } from '../Background';
import { coreTheme as theme } from '../themes';

expect.extend(matchers);

function withThemeProvider<Props>(
  WrappedComponent: React.ComponentType<Props>
) {
  const WithBoundaryComponent: React.FC<Props> = (props) => (
    <ThemeProvider theme={theme}>
      <WrappedComponent {...props} />
    </ThemeProvider>
  );
  return WithBoundaryComponent;
}
const setupRtl = overArgs(
  setupRtlBase,
  withThemeProvider
) as typeof setupRtlBase;
const renderView = setupRtl(Background, {
  children: <div data-testid="content" />,
});
const ActiveMode = () => {
  const { mode } = useTheme();
  return <div>{mode}</div>;
};

describe('Background', () => {
  it('switches the default colormode when contrast standards are not met', () => {
    const { view } = renderView({ bg: 'navy' });

    expect(view.getByTestId('content').parentElement).toHaveStyleRule(
      '--color-background-current',
      theme.colors.navy
    );
    expect(view.getByTestId('content').parentElement).toHaveStyleRule(
      'background-color',
      theme.colors['background-current']
    );
  });

  it('allows for changing the color mode while nested', () => {
    const { view } = renderView({
      bg: 'navy',
      children: (
        <div data-testid="content">
          <Background bg="beige">
            <div data-testid="nested-content" />
          </Background>
        </div>
      ),
    });

    expect(view.getByTestId('content').parentElement).toHaveStyleRule(
      '--color-background-current',
      theme.colors.navy
    );
    expect(view.getByTestId('nested-content').parentElement).toHaveStyleRule(
      '--color-background-current',
      theme.colors.beige
    );
  });

  it('updates the theme context to the current mode', () => {
    const { view } = renderView({
      bg: 'navy',
      children: <ActiveMode />,
    });
    view.getByText('dark');
  });

  it('does not update the theme context when the color mode has not changed', () => {
    const { view } = renderView({
      bg: 'white',
      children: <ActiveMode />,
    });
    view.getByText('light');
  });

  it('it sets the current background color to the specified bg', () => {
    const { view } = renderView({ bg: 'paleBlue' });

    expect(view.getByTestId('content').parentElement).toHaveStyleRule(
      '--color-background-current',
      theme.colors.paleBlue
    );
  });

  it('it sets the current background color to the specified bg when switch modes', () => {
    const { view } = renderView({ bg: 'navy' });

    expect(view.getByTestId('content').parentElement).toHaveStyleRule(
      '--color-background-current',
      theme.colors.navy
    );
  });
});
