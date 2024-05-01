import { ComponentProps } from 'react';

import { Text } from '../../Typography/Text';

export const FormRequiredText: React.FC<
  Exclude<ComponentProps<typeof Text>, 'aria-hidden'>
> = (props) => (
  <Text {...props} aria-hidden>
    * Required
  </Text>
);
