import { Theme, ThemeProvider } from '@emotion/react';
import * as React from 'react';

import { setupRtl } from '../../__tests__/testUtils';
import { coreTheme as theme } from '../../themes';
import { useLogicalProperties } from '../useLogicalProperties';

const ValueReadout: React.FC = () => <span>{`${useLogicalProperties()}`}</span>;

const HookProbe: React.FC<{ themeForHook?: Theme }> = ({
  themeForHook = theme,
}) => (
  <ThemeProvider theme={themeForHook}>
    <ValueReadout />
  </ThemeProvider>
);

const renderView = setupRtl(HookProbe, {});

describe('useLogicalProperties', () => {
  it('returns false when theme sets useLogicalProperties: false', () => {
    const { view } = renderView({
      themeForHook: { ...theme, useLogicalProperties: false },
    });

    view.getByText('false');
  });

  it('returns true when theme sets useLogicalProperties: true', () => {
    const { view } = renderView({
      themeForHook: { ...theme, useLogicalProperties: true },
    });

    view.getByText('true');
  });
});
