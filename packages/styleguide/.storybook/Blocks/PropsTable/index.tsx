import React, { useContext, useState, useMemo } from 'react';
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
  const [showSystemProps, toggleSystemProps] = useState(false);

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
          <Title>System Props</Title>
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
