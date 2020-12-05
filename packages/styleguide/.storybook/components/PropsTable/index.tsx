import React, { useContext, useState, useMemo, useReducer } from 'react';
import * as system from '@codecademy/gamut-styles/src/system';
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

const { properties, variant, ...groups } = system;

const systemProps = Object.entries(properties).reduce<string[]>(
  (carry, [key, handler]) => {
    return [...carry, ...handler.propNames];
  },
  []
);

type PropTagProps = {
  prop: keyof typeof groups;
  onClick: () => void;
};

export const PropTag: React.FC<PropTagProps> = ({ prop, onClick }) => {
  const { propNames } = groups[prop];
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

interface PropsTableState {
  activeGroups: string[];
  showAll: boolean;
}

const INITIAL_STATE: PropsTableState = {
  activeGroups: [],
  showAll: true,
};

const actions = {
  TOGGLE_GROUP: 'TOGGLE_GROUP',
  TOGGLE_ALL: 'TOGGLE_ALL',
};

const reducer = (state: PropsTableState = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case actions.TOGGLE_GROUP: {
      const isActive = state.activeGroups.includes(payload);
      return {
        ...state,
        activeGroups: isActive
          ? state.activeGroups.filter((group) => group !== payload)
          : [...state.activeGroups, payload],
      };
    }
    case actions.TOGGLE_ALL: {
      return {
        ...state,
        showAll: !state.showAll,
      };
    }
  }
};

type PropsTableProps = Parameters<typeof ArgsTable>[0] & {
  defaultGroups: string[];
};

export const PropsTable: React.FC<PropsTableProps> = ({
  defaultGroups,
  ...props
}) => {
  const {
    parameters: { argTypes },
  } = useContext(DocsContext);

  const [{ showAll, activeGroups }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE
  );
  const toggleAll = () => dispatch({ type: actions.TOGGLE_ALL });
  const toggleGroup = (group: string) =>
    dispatch({ type: actions.TOGGLE_GROUP, payload: group });

  const usedProps = useMemo<string[]>(
    () => Object.keys(argTypes).filter((prop) => systemProps.includes(prop)),
    [argTypes]
  );

  const hasSystemProps = usedProps.length > 0;

  const propGroups = useMemo(() => {
    return Object.entries(groups).reduce<string[]>(
      (carry, [groupKey, { propNames }]) => {
        if (intersection(propNames, usedProps).length > 0) {
          return [...carry, groupKey];
        }
        return carry;
      },
      []
    );
  }, [usedProps]);

  const excludedProps = useMemo<string[]>(() => {
    if (showAll) return [];
    return Object.entries(groups).reduce((carry, [group, { propNames }]) => {
      if (activeGroups.includes(group)) {
        return carry;
      }
      return [...carry, ...propNames];
    }, []);
  }, [showAll, activeGroups]);

  return (
    <React.Fragment>
      {hasSystemProps && (
        <Header>
          <HeaderColumn>
            <Title>System Props</Title>
          </HeaderColumn>
          <HeaderColumn>
            {propGroups.map((group) => (
              <PropTag
                prop={group as keyof typeof groups}
                onClick={() => toggleGroup(group)}
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
