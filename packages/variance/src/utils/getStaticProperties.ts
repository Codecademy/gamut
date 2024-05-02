import keys from 'lodash/keys';
import pick from 'lodash/pick';

export const getStaticCss = (
  props: Record<string, any>,
  filteredKeys: string[]
) =>
  pick(
    props,
    keys(props).filter((key) => !filteredKeys.includes(key))
  );
