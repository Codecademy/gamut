import { GamutProvider, percipioTheme } from '@codecademy/gamut-styles';
import { render } from '@testing-library/react';

import { Text } from '../Text';

describe('Text', () => {
  it('applies theme base font stack by default under percipioTheme', () => {
    const { container } = render(
      <GamutProvider theme={percipioTheme} useCache={false} useGlobals={false}>
        <Text>Hello</Text>
      </GamutProvider>
    );
    const el = container.querySelector('span');
    expect(el).toBeTruthy();
    expect(window.getComputedStyle(el as HTMLSpanElement).fontFamily).toMatch(
      /Roboto/i
    );
  });

  it('uses theme monospace for as="code" under percipioTheme', () => {
    const { container } = render(
      <GamutProvider theme={percipioTheme} useCache={false} useGlobals={false}>
        <Text as="code">code</Text>
      </GamutProvider>
    );
    const el = container.querySelector('code');
    expect(el).toBeTruthy();
    expect(window.getComputedStyle(el as HTMLElement).fontFamily).toMatch(
      /Roboto Mono/i
    );
  });
});
