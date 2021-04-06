import { keys, pick } from 'lodash';

export const getStaticCss = (
  props: Record<string, any>,
  filteredKeys: string[]
) =>
  pick(
    props,
    keys(props).filter((key) => !filteredKeys.includes(key))
  );
