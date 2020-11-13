import React, { useContext, useState, useMemo } from 'react';
import * as system from '@codecademy/gamut-styles/src/system';
import { Toggle } from '@codecademy/gamut/src';
import { ArgsTable, DocsContext } from '@storybook/addon-docs/blocks';
import { intersection } from 'lodash';
import styled from '@emotion/styled';
import { colors, fontAccent, spacing } from '@codecademy/gamut-styles';

const { properties, variant, ...groups } = system;

const systemProps = Object.entries(properties).reduce<string[]>(
  (carry, [key, handler]) => {
    return [...carry, ...handler.propNames];
  },
  []
);

const Tag = styled.span`
  display: inline-block;
  padding: ${spacing[4]} ${spacing[8]};
  font-size: 12px;
  font-family: ${fontAccent};
  margin: ${spacing[4]};
  background-color: ${colors['gray-100']};
  color: ${colors['gray-500']};
  text-transform: uppercase;

  &:first-of-type {
    margin-left: 0;
  }
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
`;

const Title = styled.p`
  display: inline-block;
  color: rgba(51, 51, 51, 0.75);
  margin: 0;
  margin-right: ${spacing[8]};
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleLabel = styled.span`
  margin-right: 4px;
  color: rgba(51, 51, 51, 0.75);
`;

export const PropsTable: React.FC<Parameters<typeof ArgsTable>[0]> = (
  props
) => {
  const context = useContext(DocsContext);
  const {
    parameters: { argTypes },
  } = context;
  const [showSystemProps, toggleSystemProps] = useState(false);

  const usedProps = useMemo(
    (): string[] =>
      Object.keys(argTypes).filter((prop) => systemProps.includes(prop)),
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
    <div>
      {usedProps.length > 0 && (
        <React.Fragment>
          <Header>
            <Title>System Props</Title>
            <ToggleContainer>
              <ToggleLabel>Show in table:</ToggleLabel>
              <Toggle
                size="small"
                label="Show in table"
                checked={showSystemProps}
                onChange={() => toggleSystemProps(!showSystemProps)}
              />
            </ToggleContainer>
          </Header>
          <div>
            {systemPropGroups.map((group) => (
              <Tag key={group}>{group}</Tag>
            ))}
          </div>
        </React.Fragment>
      )}

      <ArgsTable
        {...props}
        exclude={showSystemProps ? [] : usedProps}
      ></ArgsTable>
    </div>
  );
};
