import { pickBy } from 'lodash';

export const pickDataProps = (props: {}) =>
  pickBy(props, (value, key: string) => key.startsWith('data-'));
