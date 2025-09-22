import { render } from '@testing-library/react';

import { GamutProvider } from '../GamutProvider';
import { coreTheme, lxStudioTheme, percipioTheme } from '../themes';

// Type assertion to satisfy Theme interface in GamutProvider from theme.d.ts
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
      {
        filePath: 'https://www.codecademy.com/gamut/apercu-bold-pro',
        extensions: ['woff2', 'woff'],
        name: 'Apercu',
        weight: 'bold',
      },
    ],
    percipio: [
      {
        filePath: 'https://www.codecademy.com/gamut/roboto-regular',
        extensions: ['woff2', 'woff'],
        name: 'Roboto',
      },
      {
        filePath: 'https://www.codecademy.com/gamut/roboto-bold',
        extensions: ['woff2', 'woff'],
        name: 'Roboto',
        weight: 'bold',
      },
    ],
  },
}));

const mockGetFonts = require('../utils/fontUtils').getFonts;

describe('Theme Font Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Core Theme Font Loading', () => {
    it('should load core fonts when using core theme', () => {
      mockGetFonts.mockReturnValue([
        {
          filePath: 'https://www.codecademy.com/gamut/apercu-regular-pro',
          extensions: ['woff2', 'woff'],
          name: 'Apercu',
        },
        {
          filePath: 'https://www.codecademy.com/gamut/apercu-bold-pro',
          extensions: ['woff2', 'woff'],
          name: 'Apercu',
          weight: 'bold',
        },
      ]);

      const { container } = render(
        <GamutProvider theme={coreTheme}>
          <div>Test content</div>
        </GamutProvider>
      );

      const links = container.querySelectorAll('link[rel="preload"]');
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveAttribute(
        'href',
        'https://www.codecademy.com/gamut/apercu-regular-pro.woff2'
      );
      expect(links[1]).toHaveAttribute(
        'href',
        'https://www.codecademy.com/gamut/apercu-bold-pro.woff2'
      );
      expect(mockGetFonts).toHaveBeenCalledWith('core');
    });

    it('should handle core theme with explicit name', () => {
      const coreThemeWithName = { ...coreTheme, name: 'core' };
      mockGetFonts.mockReturnValue([]);

      render(
        <GamutProvider theme={coreThemeWithName}>
          <div>Test content</div>
        </GamutProvider>
      );

      expect(mockGetFonts).toHaveBeenCalledWith('core');
    });
  });

  describe('Percipio Theme Font Loading', () => {
    it('should load percipio fonts when using percipio theme', () => {
      mockGetFonts.mockReturnValue([
        {
          filePath: 'https://www.codecademy.com/gamut/roboto-regular',
          extensions: ['woff2', 'woff'],
          name: 'Roboto',
        },
        {
          filePath: 'https://www.codecademy.com/gamut/roboto-bold',
          extensions: ['woff2', 'woff'],
          name: 'Roboto',
          weight: 'bold',
        },
      ]);

      const { container } = render(
        <GamutProvider theme={typedPercipioTheme}>
          <div>Test content</div>
        </GamutProvider>
      );

      const links = container.querySelectorAll('link[rel="preload"]');
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveAttribute(
        'href',
        'https://www.codecademy.com/gamut/roboto-regular.woff2'
      );
      expect(links[1]).toHaveAttribute(
        'href',
        'https://www.codecademy.com/gamut/roboto-bold.woff2'
      );
      expect(mockGetFonts).toHaveBeenCalledWith('percipio');
    });

    it('should handle percipio theme font loading errors gracefully', () => {
      mockGetFonts.mockImplementation(() => {
        throw new Error('Font loading failed');
      });

      expect(() => {
        render(
          <GamutProvider theme={typedPercipioTheme}>
            <div>Test content</div>
          </GamutProvider>
        );
      }).not.toThrow();
    });
  });

  describe('Custom Theme Font Loading', () => {
    it('should load fonts for custom theme with valid name', () => {
      const customTheme = {
        ...coreTheme,
        name: 'custom',
        fontFamily: {
          ...coreTheme.fontFamily,
          base: '"Custom Font", sans-serif',
        },
      };

      mockGetFonts.mockReturnValue([
        {
          filePath: 'https://www.codecademy.com/gamut/custom-font',
          extensions: ['woff2'],
          name: 'Custom Font',
        },
      ]);

      const { container } = render(
        <GamutProvider theme={customTheme}>
          <div>Test content</div>
        </GamutProvider>
      );

      const links = container.querySelectorAll('link[rel="preload"]');
      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAttribute(
        'href',
        'https://www.codecademy.com/gamut/custom-font.woff2'
      );
      expect(mockGetFonts).toHaveBeenCalledWith('custom');
    });

    it('should fallback to core fonts for unknown theme names', () => {
      const unknownTheme = {
        ...coreTheme,
        name: 'unknown-theme',
      };

      mockGetFonts.mockReturnValue([
        {
          filePath: 'https://www.codecademy.com/gamut/apercu-regular-pro',
          extensions: ['woff2', 'woff'],
          name: 'Apercu',
        },
      ]);

      const { container } = render(
        <GamutProvider theme={unknownTheme}>
          <div>Test content</div>
        </GamutProvider>
      );

      const links = container.querySelectorAll('link[rel="preload"]');
      expect(links).toHaveLength(1);
      expect(mockGetFonts).toHaveBeenCalledWith('unknown-theme');
    });
  });

  describe('Theme Switching', () => {
    it('should update fonts when theme changes', () => {
      const { rerender } = render(
        <GamutProvider theme={coreTheme}>
          <div>Test content</div>
        </GamutProvider>
      );

      // Initial render with core theme
      expect(mockGetFonts).toHaveBeenCalledWith('core');

      mockGetFonts.mockReturnValue([
        {
          filePath: 'https://www.codecademy.com/gamut/roboto-regular',
          extensions: ['woff2'],
          name: 'Roboto',
        },
      ]);

      // Swap to percipio theme
      rerender(
        <GamutProvider theme={typedPercipioTheme}>
          <div>Test content</div>
        </GamutProvider>
      );

      expect(mockGetFonts).toHaveBeenCalledWith('percipio');
    });

    it('should handle rapid theme switching without errors', () => {
      const { rerender } = render(
        <GamutProvider theme={coreTheme}>
          <div>Test content</div>
        </GamutProvider>
      );

      for (let i = 0; i < 10; i += 1) {
        rerender(
          <GamutProvider theme={lxStudioTheme as any}>
            <div>Test content</div>
          </GamutProvider>
        );
      }

      expect(() => {
        rerender(
          <GamutProvider theme={typedPercipioTheme}>
            <div>Test content</div>
          </GamutProvider>
        );
      }).not.toThrow();
    });
  });

  describe('Font Loading with useGlobals disabled', () => {
    it('should not load fonts when useGlobals is false', () => {
      mockGetFonts.mockReturnValue([
        {
          filePath: 'https://www.codecademy.com/gamut/apercu-regular-pro',
          extensions: ['woff2'],
          name: 'Apercu',
        },
      ]);

      const { container } = render(
        <GamutProvider theme={coreTheme} useGlobals={false}>
          <div>Test content</div>
        </GamutProvider>
      );

      const links = container.querySelectorAll('link[rel="preload"]');
      expect(links).toHaveLength(0);
      expect(mockGetFonts).not.toHaveBeenCalled();
    });
  });

  describe('Error Recovery', () => {
    it('should recover from font loading errors on theme change', () => {
      // First render with error
      mockGetFonts.mockImplementationOnce(() => {
        throw new Error('Font loading failed');
      });

      const { rerender } = render(
        <GamutProvider theme={coreTheme}>
          <div>Test content</div>
        </GamutProvider>
      );

      expect(() => {
        rerender(
          <GamutProvider theme={coreTheme}>
            <div>Test content</div>
          </GamutProvider>
        );
      }).not.toThrow();

      // Second render should not error
      mockGetFonts.mockReturnValue([
        {
          filePath: 'https://www.codecademy.com/gamut/apercu-regular-pro',
          extensions: ['woff2'],
          name: 'Apercu',
        },
      ]);

      expect(() => {
        rerender(
          <GamutProvider theme={typedPercipioTheme}>
            <div>Test content</div>
          </GamutProvider>
        );
      }).not.toThrow();
    });

    it('should handle getFonts returning invalid data', () => {
      mockGetFonts.mockReturnValue('invalid-data');

      const { container } = render(
        <GamutProvider theme={coreTheme}>
          <div>Test content</div>
        </GamutProvider>
      );

      const links = container.querySelectorAll('link[rel="preload"]');
      expect(links).toHaveLength(0);
    });
  });

  describe('Performance', () => {
    it('should handle large numbers of font configurations efficiently', () => {
      const largeFontList = Array.from({ length: 100 }, (_, i) => ({
        filePath: `https://www.codecademy.com/gamut/font-${i}`,
        extensions: ['woff2'],
        name: `Font ${i}`,
      }));

      mockGetFonts.mockReturnValue(largeFontList);

      const { container } = render(
        <GamutProvider theme={coreTheme}>
          <div>Test content</div>
        </GamutProvider>
      );

      const links = container.querySelectorAll('link[rel="preload"]');
      expect(links).toHaveLength(100);
      expect(() => {
        render(
          <GamutProvider theme={coreTheme}>
            <div>Test content</div>
          </GamutProvider>
        );
      }).not.toThrow();
    });
  });
});
