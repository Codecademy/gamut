/**
 * Tests that style tags receive the CSP nonce when GamutProvider is given a nonce.
 * Uses the real createEmotionCache (no mocks) so we assert the full contract.
 */
import { render } from '@testing-library/react';

import { GamutProvider } from '../GamutProvider';
import { coreTheme } from '../themes';

const TEST_NONCE = 'test-nonce';

describe('GamutProvider CSP nonce', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('injects style tags with the nonce attribute when nonce is provided', () => {
    render(
      <GamutProvider nonce={TEST_NONCE} theme={coreTheme}>
        <div>child</div>
      </GamutProvider>
    );

    const styleTagsWithNonce = document.querySelectorAll(
      `style[nonce="${TEST_NONCE}"]`
    );

    expect(styleTagsWithNonce.length).toBeGreaterThanOrEqual(1);
  });
});
