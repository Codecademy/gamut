const defaultHeight = '200px';
const defaultWidth = '500px';
const defaultContentHeight = '1000px';
const defaultTop = '200px';
const defaultLeft = '0px';
const targetWidth = '100px';
const targetHeight = '50px';
const defaultOuterHeight = '400px';
const defaultOuterWidth = '600px';
const defaultOuterTop = '100px';
const defaultOuterContentHeight = '2000px';
const defaultInnerTop = '50px';
const defaultInnerLeft = '50px';

export const createMockDOMRect = (
  top: number,
  left: number,
  width: number,
  height: number
): DOMRect => ({
  top,
  bottom: top + height,
  left,
  right: left + width,
  height,
  width,
  x: left,
  y: top,
  toJSON: jest.fn(),
});

export const createStyledElement = (
  tagName = 'div',
  styles: Partial<CSSStyleDeclaration> = {}
): HTMLElement => {
  const element = document.createElement(tagName);
  Object.assign(element.style, styles);
  return element;
};

export const createScrollableParent = (
  options: Partial<CSSStyleDeclaration> & {
    contentHeight?: string;
    appendToBody?: boolean;
  } = {}
): { parent: HTMLElement; target: HTMLElement } => {
  const {
    height = defaultHeight,
    width = defaultWidth,
    position = 'absolute',
    top = defaultTop,
    left = defaultLeft,
    contentHeight = defaultContentHeight,
    appendToBody = true,
    ...restStyles
  } = options;

  const parent = createStyledElement('div', {
    overflow: 'auto',
    height,
    width,
    position,
    top,
    left,
    ...restStyles,
  });

  const content = createStyledElement('div', { height: contentHeight, width });
  parent.appendChild(content);

  const target = createStyledElement('div', {
    width: targetWidth,
    height: targetHeight,
  });
  parent.appendChild(target);

  if (appendToBody) {
    document.body.appendChild(parent);
  }

  return { parent, target };
};

export const createNestedScrollableParents = (
  options: {
    outer?: Partial<CSSStyleDeclaration> & { contentHeight?: string };
    inner?: Partial<CSSStyleDeclaration> & { contentHeight?: string };
  } = {}
): {
  outerParent: HTMLElement;
  innerParent: HTMLElement;
  target: HTMLElement;
} => {
  const { outer = {}, inner = {} } = options;

  const {
    height: outerHeight = defaultOuterHeight,
    width: outerWidth = defaultOuterWidth,
    top: outerTop = defaultOuterTop,
    left: outerLeft = defaultLeft,
    contentHeight: outerContentHeight = defaultOuterContentHeight,
    ...outerRestStyles
  } = outer;

  const outerParent = createStyledElement('div', {
    overflow: 'auto',
    height: outerHeight,
    width: outerWidth,
    position: 'absolute',
    top: outerTop,
    left: outerLeft,
    ...outerRestStyles,
  });

  const outerContent = createStyledElement('div', {
    height: outerContentHeight,
    width: outerWidth,
  });
  outerParent.appendChild(outerContent);

  const {
    height: innerHeight = defaultHeight,
    width: innerWidth = defaultWidth,
    top: innerTop = defaultInnerTop,
    left: innerLeft = defaultInnerLeft,
    contentHeight: innerContentHeight = defaultContentHeight,
    ...innerRestStyles
  } = inner;

  const { parent: innerParent, target } = createScrollableParent({
    height: innerHeight,
    width: innerWidth,
    position: 'relative',
    top: innerTop,
    left: innerLeft,
    contentHeight: innerContentHeight,
    appendToBody: false,
    ...innerRestStyles,
  });

  outerParent.appendChild(innerParent);
  document.body.appendChild(outerParent);

  return { outerParent, innerParent, target };
};

export const setupWindowDimensions = () => {
  const dimensions = { writable: true, configurable: true, value: 1000 };
  Object.defineProperty(window, 'innerHeight', dimensions);
  Object.defineProperty(window, 'innerWidth', dimensions);
  Object.defineProperty(document.documentElement, 'clientHeight', dimensions);
  Object.defineProperty(document.documentElement, 'clientWidth', dimensions);
};
