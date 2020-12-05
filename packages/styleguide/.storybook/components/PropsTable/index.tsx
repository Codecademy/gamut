import React, { useContext, useMemo } from 'react';
import { propGroups, properties, PropGroups } from './constants';
import { Toggle } from '@codecademy/gamut/src';
import { ArgsTable, DocsContext } from '@storybook/addon-docs/blocks';
import { intersection } from 'lodash';
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
    parameters: { argTypes },
  } = useContext(DocsContext);

  const [{ showAll, activeGroups }, actions] = useSystemProps({
    showAll: false,
    activeGroups: defaultGroups,
  });

  const usedProps = useMemo<string[]>(
    () => Object.keys(argTypes).filter((prop) => properties.includes(prop)),
    [argTypes]
  );

  const hasSystemProps = usedProps.length > 0;

  const groups = useMemo(() => {
    return Object.entries(propGroups).reduce<PropGroups[]>(
      (carry, [groupKey, { propNames }]) => {
        if (intersection(propNames, usedProps).length > 0) {
          return [...carry, groupKey as PropGroups];
        }
        return carry;
      },
      []
    );
  }, [usedProps]);

  const excludedProps = useMemo<string[]>(() => {
    if (showAll) return [];
    return Object.entries(propGroups).reduce(
      (carry, [group, { propNames }]) => {
        if (activeGroups.includes(group)) {
          return carry;
        }
        return [...carry, ...propNames];
      },
      []
    );
  }, [showAll, activeGroups]);

  return (
    <React.Fragment>
      {hasSystemProps && (
        <Header>
          <HeaderColumn>
            <Title>System Props</Title>
          </HeaderColumn>
          <HeaderColumn>
            {groups.map((group) => (
              <PropTag
                prop={group}
                onClick={() => actions.toggleGroup(group)}
              />
            ))}
          </HeaderColumn>
          <HeaderColumn>
            <ToggleContainer>
              <ToggleLabel>Show in table</ToggleLabel>
              <Toggle
                size="small"
                label="Show in table"
                checked={showAll}
                onChange={actions.toggleAll}
              />
            </ToggleContainer>
          </HeaderColumn>
        </Header>
      )}
      <ArgsTable {...props} exclude={excludedProps} />
    </React.Fragment>
  );
};
