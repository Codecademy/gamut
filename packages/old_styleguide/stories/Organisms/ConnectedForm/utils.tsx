import { ListCol, ListRow, Text } from '@codecademy/gamut';
import LinkTo from '@storybook/addon-links/react';
import * as React from 'react';

// reported open Storybook issue, see https://github.com/storybookjs/storybook/issues/14539
const StorybookLink = LinkTo as any;

interface ListRowRendererProps {
  inputs: { name: string; counterpart: string }[];
}

export const ListRowRenderer: React.FC<ListRowRendererProps> = ({ inputs }) => {
  return (
    <>
      {inputs.map(({ name, counterpart }) => {
        return (
          <ListRow>
            <ListCol size="lg" type="header">
              <Text as="code" ml={8}>
                {name}
              </Text>
            </ListCol>
            <ListCol size="lg" fill>
              <StorybookLink
                id={`Atoms/FormInputs/${counterpart}`}
                kind={`Atoms/FormInputs/${counterpart}`}
              >
                {counterpart}
              </StorybookLink>
            </ListCol>
          </ListRow>
        );
      })}
    </>
  );
};
