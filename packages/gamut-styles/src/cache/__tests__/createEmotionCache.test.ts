import { createEmotionCache } from '../createEmotionCache';

describe(createEmotionCache, () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('creates a container if none exists', () => {
    const prebuild = document.getElementById('emotion-styles');
    expect(prebuild).toBe(null);

    createEmotionCache();
    const container = document.getElementById('emotion-styles');

    expect(container).toBeDefined();
  });
  it('creates a cache with our correct cache key', () => {
    const cache = createEmotionCache();
    expect(cache.key).toBe('gamut');
  });
  it('accepts arguments to override the default settings', () => {
    const customContainer = document.createElement('div');
    customContainer.setAttribute('id', 'custom');
    document.body.appendChild(customContainer);

    const cache = createEmotionCache({
      key: 'custom',
      container: customContainer,
    });

    expect(cache.key).toBe('custom');
    const container = document.getElementById('emotion-styles');
    expect(container).toBe(null);
  });

  it('passes nonce to the cache for CSP when provided', () => {
    const cache = createEmotionCache({ nonce: 'csp-nonce-123' });

    expect(cache.nonce).toBe('csp-nonce-123');
  });
});
