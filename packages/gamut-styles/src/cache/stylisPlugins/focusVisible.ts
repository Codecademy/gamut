import { StylisPlugin } from '@emotion/cache';

export const focusVisible: StylisPlugin = (element) => {
  console.log('ele', element);
  if (element.type === 'rule' && element.value.includes(':focus-visible')) {
    console.log('ele 2', element);
    element.props = element.props.map((prop) => {
      const selector = process.env.NODE_ENV === 'dev' ? `${prop}, ` : '';
      return (
        selector + prop.replace(/:focus-visible/g, '[data-focus-visible-added]')
      );
    });
  }
  return undefined;
};
