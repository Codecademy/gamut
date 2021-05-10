import createCache from '@emotion/cache';
import { Global, ThemeContext } from '@emotion/react';
import { setupEnzyme } from 'component-test-setup';
import React from 'react';

import { createEmotionCache } from '../cache';
import { GamutProvider } from '../GamutProvider';
import { theme } from '../theme';

jest.mock('../cache', () => {
  const cacheMock = jest.fn();
  return { createEmotionCache: cacheMock };
});

const renderWrapper = setupEnzyme(GamutProvider, { theme });

describe(GamutProvider, () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders with a cache by default', () => {
    const { wrapper } = renderWrapper();

    expect(wrapper).toBeDefined();
    expect(createEmotionCache).toHaveBeenCalled();
  });

  it('does not create a cache when configured not to', () => {
    renderWrapper({ useCache: false });

    expect(createEmotionCache).not.toHaveBeenCalled();
  });
  it('renders global styles', () => {
    const { wrapper } = renderWrapper();

    expect(wrapper.find(Global).length).toBe(4);
  });
  it('does not render global styles when configured', () => {
    const { wrapper } = renderWrapper({ useGlobals: false });

    expect(wrapper.find(Global).length).toBe(0);
  });
  it('wraps all elements in a ThemeProvider', () => {
    const { wrapper } = renderWrapper({
      children: (
        <ThemeContext.Consumer>
          {(value) => <div>{JSON.stringify(value)}</div>}
        </ThemeContext.Consumer>
      ),
    });

    expect(wrapper.find('div').text()).toBe(JSON.stringify(theme));
  });
  it('it can have another GamutProvider as a child with creating multiple caches or globals', () => {
    const { wrapper } = renderWrapper({ children: <GamutProvider /> });

    expect(createEmotionCache).toHaveBeenCalledTimes(1);
    expect(wrapper.find(Global).length).toEqual(4);
  });
  it('can accept a custom cache', () => {
    renderWrapper({ cache: createCache({ key: 'gamut' }) });

    expect(createEmotionCache).toHaveBeenCalledTimes(0);
  });
  it('can render custom variables', () => {
    const { wrapper } = renderWrapper({
      variables: { cool: { '--cool': 'blue' } },
    });

    const globals = wrapper.find(Global);
    expect(globals.length).toBe(3);
  });
});
