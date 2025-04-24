import { styledOptions } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { AriaTabListOptions, useTabList } from '@react-aria/tabs';
import * as React from 'react';

import { tabElementBaseProps, TabElementStyleProps } from './props';
import { tabContainerStates, tabContainerVariants } from './styles';
import { useTabShared } from './TabProvider';

export interface TabListBaseProps
  extends StyleProps<typeof tabContainerVariants>,
    StyleProps<typeof tabContainerStates>,
    TabElementStyleProps {}

const TabListBase = styled('div', styledOptions)<TabListBaseProps>(
  tabContainerVariants,
  tabContainerStates,
  tabElementBaseProps
);

type Item = {
  key: string;
};

export type TabListProps = React.PropsWithChildren &
  TabListBaseProps & {
    props: AriaTabListOptions<Item>;
  };

export const TabList: React.FC<TabListProps> = ({ props, ...rest }) => {
  const ref = React.useRef(null);
  const { variant, state } = useTabShared();
  const { tabListProps } = useTabList(props, state, ref);
  return (
    <TabListBase {...tabListProps} {...rest} variant={variant} ref={ref} />
  );
};
