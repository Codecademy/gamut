import React, { ComponentProps } from 'react';
import { PROP_GROUPS } from '../propMeta';
import { ArgsTable } from '@storybook/addon-docs/blocks';

import {
  PropItem,
  PropGroupTooltip,
  PropGroupTag,
  ToggleLabel,
} from './Elements';
import { useSystemProps } from './useSystemProps';
import { Box, GridBox, FlexBox, Text, Toggle } from '@codecademy/gamut/src';
import { Link } from '~styleguide/blocks';

type PropTagProps = {
  prop: keyof typeof PROP_GROUPS;
  active: boolean;
  onClick: () => void;
};

export const PropTag: React.FC<PropTagProps> = ({ prop, active, onClick }) => {
  const { propNames } = PROP_GROUPS[prop];
  const variant = active ? 'selected' : 'normal';
  return (
    <>
      <PropGroupTag variant={variant} onClick={onClick}>
        {prop}
      </PropGroupTag>
      <PropGroupTooltip>
        {propNames.map((propName: string) => (
          <PropItem key={`${prop}-${propName}`}>{propName}</PropItem>
        ))}
      </PropGroupTooltip>
    </>
  );
};

type PropsTableProps = ComponentProps<typeof ArgsTable> & {
  defaultGroups: string[];
};

export const PropsTable: React.FC<PropsTableProps> = ({
  defaultGroups = [],
  ...props
}) => {
  const {
    state: { showAll, allGroups, activeGroups, excludedProps, hasSystemProps },
    actions: { toggleGroup, toggleAll },
  } = useSystemProps({
    showAll: false,
    activeGroups: defaultGroups,
  });

  return (
    <>
      {hasSystemProps && (
        <Box>
          <GridBox gridTemplateColumns="minmax(0, 1fr) max-content">
            <Text fontWeight="title" as="p">
              System Props -{' '}
              <Link id="foundations-system-props--page">Learn More</Link>
            </Text>
            <FlexBox alignItems="center">
              <ToggleLabel htmlFor="toggle-props">
                Show all in table:
              </ToggleLabel>
              <Toggle
                variant="hyper"
                size="small"
                label="toggle-props"
                checked={showAll}
                onChange={toggleAll}
              />
            </FlexBox>
          </GridBox>
          <FlexBox columnGap={8} rowGap={8} flexWrap="wrap">
            {allGroups.map((group) => (
              <PropTag
                key={`${group}-group`}
                prop={group}
                onClick={() => toggleGroup(group)}
                active={showAll || activeGroups.includes(group)}
              />
            ))}
          </FlexBox>
        </Box>
      )}
      <ArgsTable {...props} exclude={excludedProps} />
    </>
  );
};
