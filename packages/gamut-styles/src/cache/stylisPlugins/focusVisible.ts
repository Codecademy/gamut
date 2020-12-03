import { StylisPlugin } from '@emotion/cache';

export const focusVisible: StylisPlugin = (element) => {
  if (element.type === 'rule' && element.value.includes(':focus-visible')) {
    element.props = element.props.map((prop) =>
      prop.replace(/:focus-visible/g, '[data-focus-visible-added]')
    );
  }
  return undefined;
};
