import { StylisPlugin } from '@emotion/cache';

export const focusVisible: StylisPlugin = (element) => {
  if (element.type === 'rule' && element.value.includes(':focus-visible')) {
    console.log('ele', element);
    element.props = element.props.map((prop) => {
      const selector = process.env.NODE_ENV === 'dev' ? `${prop}, ` : '';
      console.log(selector, 'selector');
      const hey =
        selector +
        prop.replace(/:focus-visible/g, '[data-focus-visible-added]');
      console.log(hey, 'returning');
      return hey;
    });
  }
  return undefined;
};
