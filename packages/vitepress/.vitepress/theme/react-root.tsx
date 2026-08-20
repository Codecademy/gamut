import { Background, coreTheme, GamutProvider } from '@codecademy/gamut-styles';
import type { ReactElement } from 'react';
import { createElement, StrictMode } from 'react';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';

// One shared root per mount point so live examples re-render instead of
// remounting (and re-injecting Emotion's global styles) on every edit.
const roots = new WeakMap<Element, Root>();

const Frame = ({ children }: { children: ReactElement }) =>
  createElement(
    GamutProvider,
    { theme: coreTheme },
    createElement(Background, { bg: 'white', p: 16 }, children)
  );

export const renderReact = (el: Element, node: ReactElement) => {
  let root = roots.get(el);
  if (!root) {
    root = createRoot(el);
    roots.set(el, root);
  }
  root.render(
    createElement(StrictMode, null, createElement(Frame, null, node))
  );
};

export const unmountReact = (el: Element) => {
  const root = roots.get(el);
  if (root) {
    root.unmount();
    roots.delete(el);
  }
};
