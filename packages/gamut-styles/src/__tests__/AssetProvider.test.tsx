import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import { AssetProvider, createFontLinks } from '../AssetProvider';
import { coreTheme, percipioTheme } from '../themes';
import { getFonts } from '../utils/fontUtils';

jest.mock('../utils/fontUtils', () => ({
  __esModule: true,
  getFonts: jest.fn(),
}));

jest.mock('../remoteAssets/fonts', () => ({
  __esModule: true,
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

const mockGetFonts = getFonts as jest.MockedFunction<typeof getFonts>;

describe('AssetProvider', () => {
  // Helper to get links from either container or document.head (React 19 hoists link elements)
  const getPreloadLinks = (container: HTMLElement) => {
    const containerLinks = container.querySelectorAll('link[rel="preload"]');
    if (containerLinks.length > 0) return containerLinks;
    return document.head.querySelectorAll('link[rel="preload"][as="font"]');
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Clean up any links from previous tests (React 19 hoists link elements to head)
    document.head
      .querySelectorAll('link[rel="preload"][as="font"]')
      .forEach((el) => el.remove());
  });

  describe('createFontLinks', () => {
    it('should create font links for woff2 fonts only', () => {
      const fonts = [
        {
          filePath: 'https://www.codecademy.com/gamut/test-font',
          extensions: ['woff2', 'woff'],
          name: 'Test Font',
        },
        {
          filePath: 'https://www.codecademy.com/gamut/test-font-woff1-only',
          extensions: ['woff'],
          name: 'Test Font Woff1',
        },
      ];

      const { container } = render(<>{createFontLinks(fonts)}</>);
      const links = getPreloadLinks(container);

      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAttribute(
        'href',
        'https://www.codecademy.com/gamut/test-font.woff2'
      );
      expect(links[0]).toHaveAttribute('type', 'font/woff2');
      expect(links[0]).toHaveAttribute('as', 'font');
      expect(links[0]).toHaveAttribute('crossOrigin', 'anonymous');
    });

    it('should handle empty fonts array', () => {
      const { container } = render(<>{createFontLinks([])}</>);
      const links = getPreloadLinks(container);
      expect(links).toHaveLength(0);
    });

    it('should handle undefined fonts parameter', () => {
      const { container } = render(<>{createFontLinks(undefined)}</>);
      const links = getPreloadLinks(container);
      expect(links).toHaveLength(2);
    });

    it('should filter out fonts without woff2 extension', () => {
      const fonts = [
        {
          filePath: 'https://www.codecademy.com/gamut/font-with-woff2',
          extensions: ['woff2', 'woff'],
          name: 'Font With Woff2',
        },
        {
          filePath: 'https://www.codecademy.com/gamut/font-woff1-only',
          extensions: ['woff'],
          name: 'Font Woff1 Only',
        },
        {
          filePath: 'https://www.codecademy.com/gamut/font-no-extensions',
          extensions: [],
          name: 'Font No Extensions',
        },
      ];

      const { container } = render(<>{createFontLinks(fonts)}</>);
      const links = getPreloadLinks(container);
      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAttribute(
        'href',
        'https://www.codecademy.com/gamut/font-with-woff2.woff2'
      );
    });

    it('should handle malformed font configurations gracefully', () => {
      const fonts = [
        {
          filePath: 'https://www.codecademy.com/gamut/valid-font',
          extensions: ['woff2'],
          name: 'Valid Font',
        },
        {
          // Missing required properties
          filePath: '',
          extensions: ['woff2'],
          name: '',
        } as any,
        {
          filePath: 'https://www.codecademy.com/gamut/another-valid-font',
          extensions: ['woff2'],
          name: 'Another Valid Font',
        },
      ];

      const { container } = render(<>{createFontLinks(fonts)}</>);
      const links = getPreloadLinks(container);
      expect(links).toHaveLength(2);
    });
  });

  describe('AssetProvider component', () => {
    it('should render font links for core theme by default', () => {
      mockGetFonts.mockReturnValue([
        {
          filePath: 'https://www.codecademy.com/gamut/apercu-regular-pro',
          extensions: ['woff2', 'woff'],
          name: 'Apercu',
        },
      ]);

      const { container } = render(<AssetProvider theme={coreTheme} />);
      const links = getPreloadLinks(container);

      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAttribute(
        'href',
        'https://www.codecademy.com/gamut/apercu-regular-pro.woff2'
      );
      expect(mockGetFonts).toHaveBeenCalledWith('core');
    });

    it('should render font links for percipio theme', () => {
      mockGetFonts.mockReturnValue([
        {
          filePath: 'https://www.codecademy.com/gamut/roboto-regular',
          extensions: ['woff2', 'woff'],
          name: 'Roboto',
        },
      ]);

      const { container } = render(
        <AssetProvider theme={percipioTheme as any} />
      );
      const links = getPreloadLinks(container);

      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAttribute(
        'href',
        'https://www.codecademy.com/gamut/roboto-regular.woff2'
      );
      expect(mockGetFonts).toHaveBeenCalledWith('percipio');
    });

    it('should handle theme without name property', () => {
      const themeWithoutName = { ...coreTheme, name: undefined };
      mockGetFonts.mockReturnValue([]);

      render(<AssetProvider theme={themeWithoutName} />);
      expect(mockGetFonts).toHaveBeenCalledWith('core');
    });

    it('should handle theme with invalid name', () => {
      const themeWithInvalidName = { ...coreTheme, name: 'invalid-theme' };
      mockGetFonts.mockReturnValue([]);

      render(<AssetProvider theme={themeWithInvalidName} />);
      expect(mockGetFonts).toHaveBeenCalledWith('invalid-theme');
    });

    it('should handle getFonts throwing an error', () => {
      mockGetFonts.mockImplementation(() => {
        throw new Error('Font loading failed');
      });

      const { container } = render(<AssetProvider theme={coreTheme} />);
      const links = getPreloadLinks(container);
      expect(links).toHaveLength(0);
    });

    it('should fallback to core fonts when getFonts returns undefined', () => {
      mockGetFonts.mockReturnValue(undefined);

      const { container } = render(<AssetProvider theme={coreTheme} />);
      const links = getPreloadLinks(container);
      expect(links).toHaveLength(2);
    });

    it('should fallback to core fonts when getFonts returns null', () => {
      mockGetFonts.mockReturnValue(null);

      const { container } = render(<AssetProvider theme={coreTheme} />);
      const links = getPreloadLinks(container);
      expect(links).toHaveLength(2);
    });

    it('should fallback to core fonts when getFonts returns non-array', () => {
      mockGetFonts.mockReturnValue('not-an-array');

      const { container } = render(<AssetProvider theme={coreTheme} />);
      const links = getPreloadLinks(container);
      expect(links).toHaveLength(0);
    });

    it('should render multiple font links when multiple fonts are provided', () => {
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
        {
          filePath: 'https://www.codecademy.com/gamut/font3',
          extensions: ['woff2'],
          name: 'Font 3',
        },
      ]);

      const { container } = render(<AssetProvider theme={coreTheme} />);
      const links = getPreloadLinks(container);

      expect(links).toHaveLength(3);
      expect(links[0]).toHaveAttribute(
        'href',
        'https://www.codecademy.com/gamut/font1.woff2'
      );
      expect(links[1]).toHaveAttribute(
        'href',
        'https://www.codecademy.com/gamut/font2.woff2'
      );
      expect(links[2]).toHaveAttribute(
        'href',
        'https://www.codecademy.com/gamut/font3.woff2'
      );
    });

    it('should only render valid font configurations', () => {
      mockGetFonts.mockReturnValue([
        {
          filePath: 'https://www.codecademy.com/gamut/valid-font',
          extensions: ['woff2'],
          name: 'Valid Font',
        },
        {
          filePath: '', // Empty filePath
          extensions: ['woff2'],
          name: 'Empty Path Font',
        },
        {
          // Missing filePath entirely
          extensions: ['woff2'],
          name: 'Missing Path Font',
        } as any,
      ]);

      const { container } = render(<AssetProvider theme={coreTheme} />);
      const links = getPreloadLinks(container);

      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAttribute(
        'href',
        'https://www.codecademy.com/gamut/valid-font.woff2'
      );
    });

    it('should handle font configurations with missing extensions', () => {
      mockGetFonts.mockReturnValue([
        {
          filePath: 'https://www.codecademy.com/gamut/font-with-extensions',
          extensions: ['woff2'],
          name: 'Font With Extensions',
        },
        {
          filePath: 'https://www.codecademy.com/gamut/font-no-extensions',
          extensions: undefined,
          name: 'Font No Extensions',
        } as any,
        {
          filePath: 'https://www.codecademy.com/gamut/font-empty-extensions',
          extensions: [],
          name: 'Font Empty Extensions',
        },
      ]);

      const { container } = render(<AssetProvider theme={coreTheme} />);
      const links = getPreloadLinks(container);

      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAttribute(
        'href',
        'https://www.codecademy.com/gamut/font-with-extensions.woff2'
      );
    });
  });
});
