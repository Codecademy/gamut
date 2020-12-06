import React from 'react';
import { propGroups, PropGroups } from './constants';
import { Toggle } from '@codecademy/gamut/src';
import { ArgsTable } from '@storybook/addon-docs/blocks';
import {
  Header,
  PropItem,
  PropGroupTooltip,
  PropGroupTag,
  HeaderColumn,
  Title,
  ToggleContainer,
  ToggleLabel,
} from './Elements';
import { useSystemProps } from './useSystemProps';

type PropTagProps = {
  prop: PropGroups;
  onClick: () => void;
};

export const PropTag: React.FC<PropTagProps> = ({ prop, onClick }) => {
  const { propNames } = propGroups[prop];
  return (
    <PropGroupTag onClick={onClick}>
      {prop}
      <PropGroupTooltip>
        {propNames.map((propName) => (
          <PropItem key={propName}>{propName}</PropItem>
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
    state: { showAll, allGroups, excludedProps, hasSystemProps },
    actions: { toggleGroup, toggleAll },
  } = useSystemProps({
    showAll: false,
    activeGroups: defaultGroups,
  });

  return (
    <React.Fragment>
      {hasSystemProps && (
        <Header>
          <HeaderColumn>
            <Title>System Props</Title>
          </HeaderColumn>
          <HeaderColumn>
            {allGroups.map((group) => (
              <PropTag prop={group} onClick={() => toggleGroup(group)} />
            ))}
          </HeaderColumn>
          <HeaderColumn>
            <ToggleContainer>
              <ToggleLabel>Show in table</ToggleLabel>
              <Toggle
                size="small"
                label="Show in table"
                checked={showAll}
                onChange={toggleAll}
              />
            </ToggleContainer>
          </HeaderColumn>
        </Header>
      )}
      <ArgsTable {...props} exclude={excludedProps} />
    </React.Fragment>
  );
};
