import { styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';
import {
  Tab as ReactAriaTab,
  TabProps as ReactAriaTabProps,
} from 'react-aria-components';

import { tabElementBaseProps } from './props';
import { TabButton, TabButtonProps } from './TabButton';
import { useTabShared } from './TabProvider';

export interface TabProps extends TabButtonProps, ReactAriaTabProps {}

export const TabBase = styled(
  ReactAriaTab,
  styledOptions
)<TabProps>(tabElementBaseProps);

export const Tab: React.FC<TabButtonProps> = (props) => {
  const { variant } = useTabShared();

  return <TabButton {...props} variant={variant} />;
};
