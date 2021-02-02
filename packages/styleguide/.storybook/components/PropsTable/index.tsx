import React from 'react';
import { propGroups, PropGroups } from './constants';
import { ArgsTable } from '@storybook/addon-docs/blocks';
import { BooleanControl } from '@storybook/components';

import {
  PropItem,
  PropGroupTooltip,
  PropGroupTag,
  Title,
  ToggleContainer,
  ToggleLabel,
} from './Elements';
import { useSystemProps } from './useSystemProps';
import { Box } from '../TableOfContents/elements';

type PropTagProps = {
  prop: PropGroups;
  active: boolean;
  onClick: () => void;
};

export const PropTag: React.FC<PropTagProps> = ({ prop, active, onClick }) => {
  const { propNames } = propGroups[prop];
  return (
    <PropGroupTag active={active} onClick={onClick}>
      {prop}
      <PropGroupTooltip>
        {propNames.map((propName) => (
          <PropItem key={`${prop}-${propName}`}>{propName}</PropItem>
        ))}
      </PropGroupTooltip>
    </PropGroupTag>
  );
};

type PropsTableProps = Parameters<typeof ArgsTable>[0] & {
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
          <Box display="grid" gridTemplateColumns="minmax(0, 1fr) max-content">
            <Title>System Props</Title>
            <ToggleContainer>
              <ToggleLabel htmlFor="toggle-props">
                Show all in table:
              </ToggleLabel>
              <BooleanControl
                name="toggle-props"
                value={showAll}
                defaultValue={showAll}
                onChange={toggleAll}
              />
            </ToggleContainer>
          </Box>
          <Box>
            {allGroups.map((group) => (
              <PropTag
                key={`${group}-group`}
                prop={group}
                onClick={() => toggleGroup(group)}
                active={!showAll && activeGroups.includes(group)}
              />
            ))}
          </Box>
        </Box>
      )}
      <ArgsTable {...props} exclude={excludedProps} />
    </>
  );
};
