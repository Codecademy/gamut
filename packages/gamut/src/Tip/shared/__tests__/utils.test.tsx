import { isFloatingElementOpen, isElementVisible } from '../utils';

/**
 * Helper to create a test element with mocked checkVisibility and automatic cleanup
 */
const createTestElement = (
  tagName: string = 'div',
  options: {
    attributes?: Record<string, string>;
    styles?: Partial<CSSStyleDeclaration>;
    checkVisibility?: () => boolean;
    children?: HTMLElement[];
  } = {}
): HTMLElement => {
  const element = document.createElement(tagName) as HTMLElement;

  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  if (options.styles) {
    Object.assign(element.style, options.styles);
  }

  if (options.checkVisibility !== undefined) {
    Object.defineProperty(element, 'checkVisibility', {
      value: options.checkVisibility,
      writable: true,
      configurable: true,
    });
  }

  if (options.children) {
    options.children.forEach((child) => element.appendChild(child));
  }

  return element;
};


const withTemporaryElement = <T,>(
  element: HTMLElement,
  parent: HTMLElement,
  callback: () => T
): T => {
  parent.appendChild(element);
  try {
    return callback();
  } finally {
    parent.removeChild(element);
  }
};

describe('isFloatingElementOpen', () => {
  describe('Native <dialog> elements', () => {
    it('returns true for open dialog elements', () => {
      const dialog = createTestElement('dialog', {
        attributes: {},
      }) as HTMLDialogElement;
      dialog.open = true;

      withTemporaryElement(dialog, document.body, () => {
        expect(isFloatingElementOpen(dialog)).toBe(true);
      });
    });

    it('returns false for closed dialog elements', () => {
      const dialog = createTestElement('dialog', {
        attributes: {},
      }) as HTMLDialogElement;
      dialog.open = false;

      withTemporaryElement(dialog, document.body, () => {
        expect(isFloatingElementOpen(dialog)).toBe(false);
      });
    });
  });

  describe('role="alertdialog" elements', () => {
    it('returns true for visible alertdialog (always blocking per ARIA spec)', () => {
      const alertDialog = createTestElement('div', {
        attributes: { role: 'alertdialog' },
        checkVisibility: () => true,
      });

      withTemporaryElement(alertDialog, document.body, () => {
        expect(isFloatingElementOpen(alertDialog)).toBe(true);
      });
    });

    it('returns false for hidden alertdialog', () => {
      const alertDialog = createTestElement('div', {
        attributes: { role: 'alertdialog' },
        styles: { display: 'none' },
        checkVisibility: () => false,
      });

      withTemporaryElement(alertDialog, document.body, () => {
        expect(isFloatingElementOpen(alertDialog)).toBe(false);
      });
    });

    it('returns false for alertdialog with aria-hidden="true"', () => {
      const alertDialog = createTestElement('div', {
        attributes: {
          role: 'alertdialog',
          'aria-hidden': 'true',
        },
        checkVisibility: () => true,
      });

      withTemporaryElement(alertDialog, document.body, () => {
        expect(isFloatingElementOpen(alertDialog)).toBe(false);
      });
    });
  });

  describe('role="dialog" elements with aria-modal', () => {
    it('returns true for dialog with aria-modal="true"', () => {
      const modal = createTestElement('div', {
        attributes: {
          role: 'dialog',
          'aria-modal': 'true',
        },
        checkVisibility: () => true,
      });

      withTemporaryElement(modal, document.body, () => {
        expect(isFloatingElementOpen(modal)).toBe(true);
      });
    });

    it('returns false for dialog with aria-modal="false"', () => {
      const dialog = createTestElement('div', {
        attributes: {
          role: 'dialog',
          'aria-modal': 'false',
        },
        checkVisibility: () => true,
      });

      withTemporaryElement(dialog, document.body, () => {
        expect(isFloatingElementOpen(dialog)).toBe(false);
      });
    });

    it('returns false for dialog without aria-modal attribute', () => {
      const dialog = createTestElement('div', {
        attributes: { role: 'dialog' },
        checkVisibility: () => true,
      });

      withTemporaryElement(dialog, document.body, () => {
        expect(isFloatingElementOpen(dialog)).toBe(false);
      });
    });
  });

  describe('aria-hidden attribute', () => {
    it('returns false for dialog with aria-hidden="true"', () => {
      const modal = createTestElement('div', {
        attributes: {
          role: 'dialog',
          'aria-modal': 'true',
          'aria-hidden': 'true',
        },
        checkVisibility: () => true,
      });

      withTemporaryElement(modal, document.body, () => {
        expect(isFloatingElementOpen(modal)).toBe(false);
      });
    });
  });

  describe('collapsible dialogs (aria-expanded)', () => {
    it('returns false for dialog with aria-expanded="false"', () => {
      const dialog = createTestElement('div', {
        attributes: {
          role: 'dialog',
          'aria-expanded': 'false',
        },
        checkVisibility: () => true,
      });

      withTemporaryElement(dialog, document.body, () => {
        expect(isFloatingElementOpen(dialog)).toBe(false);
      });
    });

    it('returns false when child button has aria-expanded="false"', () => {
      const button = createTestElement('button', {
        attributes: { 'aria-expanded': 'false' },
      });
      const dialog = createTestElement('div', {
        attributes: {
          role: 'dialog',
          'aria-modal': 'true',
        },
        checkVisibility: () => true,
        children: [button],
      });

      withTemporaryElement(dialog, document.body, () => {
        expect(isFloatingElementOpen(dialog)).toBe(false);
      });
    });

    it('returns true when child button has aria-expanded="true"', () => {
      const button = createTestElement('button', {
        attributes: { 'aria-expanded': 'true' },
      });
      const dialog = createTestElement('div', {
        attributes: {
          role: 'dialog',
          'aria-modal': 'true',
        },
        checkVisibility: () => true,
        children: [button],
      });

      withTemporaryElement(dialog, document.body, () => {
        expect(isFloatingElementOpen(dialog)).toBe(true);
      });
    });
  });

  describe('visibility checks', () => {
    it('returns false for hidden elements', () => {
      const modal = createTestElement('div', {
        attributes: {
          role: 'dialog',
          'aria-modal': 'true',
        },
        styles: { display: 'none' },
        checkVisibility: () => false,
      });

      withTemporaryElement(modal, document.body, () => {
        expect(isFloatingElementOpen(modal)).toBe(false);
      });
    });

    it('returns false for elements with visibility: hidden', () => {
      const modal = createTestElement('div', {
        attributes: {
          role: 'dialog',
          'aria-modal': 'true',
        },
        styles: { visibility: 'hidden' },
        checkVisibility: () => false,
      });

      withTemporaryElement(modal, document.body, () => {
        expect(isFloatingElementOpen(modal)).toBe(false);
      });
    });
  });

  describe('non-blocking popovers', () => {
    it('returns false for dialog without aria-modal (non-blocking popover)', () => {
      // InfoTip and other popovers use role="dialog" but don't have aria-modal="true"
      const popover = createTestElement('div', {
        attributes: {
          role: 'dialog',
        },
        checkVisibility: () => true,
      });

      withTemporaryElement(popover, document.body, () => {
        expect(isFloatingElementOpen(popover)).toBe(false);
      });
    });
  });

  describe('non-dialog elements', () => {
    it('returns false for elements without dialog role', () => {
      const div = createTestElement('div', {
        checkVisibility: () => true,
      });

      withTemporaryElement(div, document.body, () => {
        expect(isFloatingElementOpen(div)).toBe(false);
      });
    });

    it('returns false for elements with other roles', () => {
      const button = createTestElement('button', {
        attributes: { role: 'button' },
        checkVisibility: () => true,
      });

      withTemporaryElement(button, document.body, () => {
        expect(isFloatingElementOpen(button)).toBe(false);
      });
    });
  });

  describe('edge cases', () => {
    it('handles dialog with aria-modal="true" and aria-expanded="false" correctly', () => {
      // aria-expanded should take precedence
      const dialog = createTestElement('div', {
        attributes: {
          role: 'dialog',
          'aria-modal': 'true',
          'aria-expanded': 'false',
        },
        checkVisibility: () => true,
      });

      withTemporaryElement(dialog, document.body, () => {
        expect(isFloatingElementOpen(dialog)).toBe(false);
      });
    });

    it('handles alertdialog with aria-expanded="false" correctly', () => {
      // alertdialog is always blocking, but aria-expanded="false" indicates closed
      const alertDialog = createTestElement('div', {
        attributes: {
          role: 'alertdialog',
          'aria-expanded': 'false',
        },
        checkVisibility: () => true,
      });

      withTemporaryElement(alertDialog, document.body, () => {
        expect(isFloatingElementOpen(alertDialog)).toBe(false);
      });
    });
  });
});

describe('isElementVisible', () => {
  it('returns false for non-HTMLElement', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    expect(isElementVisible(svg)).toBe(false);
  });

  it('returns true for visible HTMLElement when checkVisibility is available', () => {
    const div = createTestElement('div', {
      checkVisibility: () => true,
    });

    withTemporaryElement(div, document.body, () => {
      expect(isElementVisible(div)).toBe(true);
    });
  });

  it('returns false for hidden HTMLElement when checkVisibility is available', () => {
    const div = createTestElement('div', {
      styles: { display: 'none' },
      checkVisibility: () => false,
    });

    withTemporaryElement(div, document.body, () => {
      expect(isElementVisible(div)).toBe(false);
    });
  });

  it('returns true as fallback when checkVisibility is not available', () => {
    const div = createTestElement('div');

    // Remove checkVisibility if it exists
    if ('checkVisibility' in div) {
      delete (div as any).checkVisibility;
    }

    withTemporaryElement(div, document.body, () => {
      expect(isElementVisible(div)).toBe(true);
    });
  });
});
