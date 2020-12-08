import React, { useContext, useState, useMemo } from 'react';
import {
  properties,
  background,
  typography,
  space,
  grid,
  flex,
  color,
  shadow,
  border,
  positioning,
  layout,
} from '@codecademy/gamut-styles';
import { Toggle } from '@codecademy/gamut';
import { Text } from '@codecademy/gamut-labs';
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

const groups = {
  typography,
  space,
  grid,
  flex,
  color,
  shadow,
  border,
  background,
  positioning,
  layout,
};

const systemProps = Object.entries(properties).reduce<string[]>(
  (carry, [key, handler]) => {
    return [...carry, ...handler.propNames];
  },
  []
);

export const PropTag: React.FC<{ prop: keyof typeof groups }> = ({ prop }) => {
  const subprops = groups[prop].propNames;
  return (
    <PropGroupTag>
      {prop}
      <PropGroupTooltip>
        {subprops.map((propName) => (
          <PropItem key={propName}>{propName}</PropItem>
        ))}
      </PropGroupTooltip>
    </PropGroupTag>
  );
};

export const PropsTable: React.FC<Parameters<typeof ArgsTable>[0]> = (
  props
) => {
  const context = useContext(DocsContext);
  const {
    parameters: { argTypes },
  } = context;
  const [showSystemProps, toggleSystemProps] = useState(true);

  const usedProps = useMemo<string[]>(
    () => Object.keys(argTypes).filter((prop) => systemProps.includes(prop)),
    [argTypes]
  );

  const systemPropGroups = useMemo(() => {
    return Object.entries(groups).reduce<string[]>(
      (carry, [groupKey, handler]) => {
        if (intersection(handler.propNames, usedProps).length > 0) {
          return [...carry, groupKey];
        }
        return carry;
      },
      []
    );
  }, [usedProps]);

  return (
    <React.Fragment>
      {usedProps.length > 0 && (
        <Header>
          <HeaderColumn>
            <Title>System Props</Title>
          </HeaderColumn>
          <HeaderColumn>
            {systemPropGroups.map((group) => (
              <PropTag prop={group as keyof typeof groups} />
            ))}
          </HeaderColumn>
          <HeaderColumn>
            <ToggleContainer>
              <ToggleLabel>Show in table</ToggleLabel>
              <Toggle
                size="small"
                label="Show in table"
                checked={showSystemProps}
                onChange={() => toggleSystemProps(!showSystemProps)}
              />
            </ToggleContainer>
          </HeaderColumn>
        </Header>
      )}
      <ArgsTable {...props} exclude={showSystemProps ? [] : usedProps} />
    </React.Fragment>
  );
};
