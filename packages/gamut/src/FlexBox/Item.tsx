import React from 'react';

import { Container, ContainerProps } from './Container';

/**
 * @deprecated  This component is deprecated and is no longer supported
 *
 * See [FlexBox](https://gamut.codecademy.com/storybook/?path=/docs/layouts-box-flexbox--flex-box) for similiar functionality
 *
 * ```
 * import { FlexBox } from '@corecademy/gamut';
 *
 * <FlexBox alignItems="center" justifyContent="center" />
 * ```
 */

export const Item: React.FC<ContainerProps> = (props) => {
  return <Container {...props} />;
};

Item.defaultProps = {
  flex: false,
};
