import { StylisPlugin } from '@emotion/cache';

export const focusVisible: StylisPlugin = (element) => {
  if (element.type === 'rule' && element.value.includes(':focus-visible')) {
    element.props = element.props.map((prop) => {
      const selector = `${prop}, `;
      return (
        selector + prop.replace(/:focus-visible/g, '[data-focus-visible-added]')
      );
    });
  }
  return undefined;
};
