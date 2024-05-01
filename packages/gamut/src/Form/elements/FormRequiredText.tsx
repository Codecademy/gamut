import { ComponentProps } from 'react';

import { Text } from '../../Typography/Text';

export const FormRequiredText: React.FC<ComponentProps<typeof Text>> = (
  props
) => <Text {...props}>* Required</Text>;
