import { pickBy } from 'lodash';

export const pickDataProps = (props: {}) =>
  pickBy(props, (value, key) => /^data-/.test(key));
