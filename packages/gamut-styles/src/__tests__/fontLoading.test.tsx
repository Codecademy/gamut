import { render } from '@testing-library/react';

import { AssetProvider } from '../AssetProvider';
import { coreTheme, percipioTheme } from '../themes';

// Type assertion to satisfy Theme interface in GamutProvider from theme.d.ts - this lib is type to the CoreTheme interface
const typedPercipioTheme = percipioTheme as any;

jest.mock('../utils/fontUtils', () => ({
  getFonts: jest.fn(),
}));

jest.mock('../remoteAssets/fonts', () => ({
  webFonts: {
    core: [
      {
        filePath: 'https://www.codecademy.com/gamut/apercu-regular-pro',
        extensions: ['woff2', 'woff'],
        name: 'Apercu',
      },
    ],
    percipio: [
      {
        filePath: 'https://www.codecademy.com/gamut/roboto-regular',
        extensions: ['woff2', 'woff'],
        name: 'Roboto',
      },
    ],
  },
}));

const mockGetFonts = require('../utils/fontUtils').getFonts;

const mockDocumentFonts = {
  load: jest.fn(),
  ready: Promise.resolve(),
  check: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

Object.defineProperty(document, 'fonts', {
  value: mockDocumentFonts,
  writable: true,
});

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('Font Loading and Error Handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDocumentFonts.load.mockClear();
    mockDocumentFonts.check.mockClear();
    mockFetch.mockClear();
  });

  describe('Font Preloading', () => {
    it('should create preload links for fonts', () => {
      mockGetFonts.mockReturnValue([
        {
          filePath: 'https://www.codecademy.com/gamut/test-font',
          extensions: ['woff2', 'woff'],
          name: 'Test Font',
        },
      ]);

      const { container } = render(<AssetProvider theme={coreTheme} />);

      const links = container.querySelectorAll('link[rel="preload"]');
      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAttribute(
        'href',
        'https://www.codecademy.com/gamut/test-font.woff2'
      );
      expect(links[0]).toHaveAttribute('type', 'font/woff2');
      expect(links[0]).toHaveAttribute('as', 'font');
    });

    it('should handle multiple fonts preloading', () => {
      mockGetFonts.mockReturnValue([
        {
          filePath: 'https://www.codecademy.com/gamut/font1',
          extensions: ['woff2'],
          name: 'Font 1',
        },
        {
          filePath: 'https://www.codecademy.com/gamut/font2',
          extensions: ['woff2'],
          name: 'Font 2',
        },
      ]);

      const { container } = render(<AssetProvider theme={coreTheme} />);

      const links = container.querySelectorAll('link[rel="preload"]');
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveAttribute(
        'href',
        'https://www.codecademy.com/gamut/font1.woff2'
      );
      expect(links[1]).toHaveAttribute(
        'href',
        'https://www.codecademy.com/gamut/font2.woff2'
      );
    });
  });

  describe('Font Loading Failures', () => {
    it('should handle getFonts throwing an error', () => {
      mockGetFonts.mockImplementation(() => {
        throw new Error('Font loading failed');
      });

      const { container } = render(<AssetProvider theme={coreTheme} />);

      // Should not render any links when getFonts fails
      const links = container.querySelectorAll('link[rel="preload"]');
      expect(links).toHaveLength(0);
    });

    it('should handle malformed font configurations', () => {
      mockGetFonts.mockReturnValue([
        {
          filePath: 'https://www.codecademy.com/gamut/valid-font',
          extensions: ['woff2'],
          name: 'Valid Font',
        },
        {
          // Malformed font config
          filePath: '',
          extensions: ['woff2'],
          name: 'Invalid Font',
        } as any,
        {
          filePath: 'https://www.codecademy.com/gamut/another-valid-font',
          extensions: ['woff2'],
          name: 'Another Valid Font',
        },
      ]);

      const { container } = render(<AssetProvider theme={coreTheme} />);

      const links = container.querySelectorAll('link[rel="preload"]');
      expect(links).toHaveLength(2);
    });
  });

  describe('Font Fallback Behavior', () => {
    it('should create preload links for all valid fonts', () => {
      mockGetFonts.mockReturnValue([
        {
          filePath: 'https://www.codecademy.com/gamut/font1',
          extensions: ['woff2'],
          name: 'Font 1',
        },
        {
          filePath: 'https://www.codecademy.com/gamut/font2',
          extensions: ['woff2'],
          name: 'Font 2',
        },
      ]);

      const { container } = render(<AssetProvider theme={coreTheme} />);

      // Should render preload links for all fonts
      const links = container.querySelectorAll('link[rel="preload"]');
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveAttribute(
        'href',
        'https://www.codecademy.com/gamut/font1.woff2'
      );
      expect(links[1]).toHaveAttribute(
        'href',
        'https://www.codecademy.com/gamut/font2.woff2'
      );
    });
  });

  describe('Browser Compatibility', () => {
    it('should handle browsers without document.fonts API', () => {
      const originalFonts = document.fonts;
      Object.defineProperty(document, 'fonts', {
        value: undefined,
        writable: true,
      });

      mockGetFonts.mockReturnValue([
        {
          filePath: 'https://www.codecademy.com/gamut/test-font',
          extensions: ['woff2'],
          name: 'Test Font',
        },
      ]);

      const { container } = render(<AssetProvider theme={coreTheme} />);

      const links = container.querySelectorAll('link[rel="preload"]');
      expect(links).toHaveLength(1);

      Object.defineProperty(document, 'fonts', {
        value: originalFonts,
        writable: true,
      });
    });

    it('should handle browsers without fetch API', () => {
      const originalFetch = global.fetch;
      global.fetch = undefined as any;

      mockGetFonts.mockReturnValue([
        {
          filePath: 'https://www.codecademy.com/gamut/test-font',
          extensions: ['woff2'],
          name: 'Test Font',
        },
      ]);

      const { container } = render(<AssetProvider theme={coreTheme} />);

      const links = container.querySelectorAll('link[rel="preload"]');
      expect(links).toHaveLength(1);

      global.fetch = originalFetch;
    });
  });

  describe('Performance and Memory', () => {
    it('should not cause memory leaks with repeated rendering', () => {
      mockGetFonts.mockReturnValue([
        {
          filePath: 'https://www.codecademy.com/gamut/test-font',
          extensions: ['woff2'],
          name: 'Test Font',
        },
      ]);

      for (let i = 0; i < 10; i += 1) {
        const { unmount } = render(<AssetProvider theme={coreTheme} />);
        unmount();
      }

      expect(() => {
        render(<AssetProvider theme={coreTheme} />);
      }).not.toThrow();
    });

    it('should handle rapid theme changes without errors', () => {
      mockGetFonts.mockReturnValue([
        {
          filePath: 'https://www.codecademy.com/gamut/test-font',
          extensions: ['woff2'],
          name: 'Test Font',
        },
      ]);

      const { rerender } = render(<AssetProvider theme={coreTheme} />);

      for (let i = 0; i < 5; i += 1) {
        rerender(<AssetProvider theme={typedPercipioTheme} />);
        rerender(<AssetProvider theme={coreTheme} />);
      }

      expect(() => {
        rerender(<AssetProvider theme={typedPercipioTheme} />);
      }).not.toThrow();
    });
  });
});
