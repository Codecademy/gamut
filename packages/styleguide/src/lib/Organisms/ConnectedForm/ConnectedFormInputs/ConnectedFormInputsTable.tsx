import { Box, List , ListCol, ListRow, Text } from "@codecademy/gamut"
import LinkTo from '@storybook/addon-links/react';
import * as React from 'react';

// reported open Storybook issue, see https://github.com/storybookjs/storybook/issues/14539
// without casting, TS will show an error for the `id` prop
const StorybookLink = LinkTo as any;

interface ListRowRendererProps {
  inputs: { name: string; counterpart: string }[];
}

const ListRowRenderer: React.FC<ListRowRendererProps> = ({ inputs }) => {
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


export const ConnectedFormInputsTable = () => {
  return (
    <Box mx={40} mt={16} mb={40}>
      <List variant="table">
        <ListRowRenderer
          inputs={[
            { name: 'ConnectedInput', counterpart: 'Input' },
            { name: 'ConnectedSelect', counterpart: 'Select' },
            { name: 'ConnectedCheckbox', counterpart: 'Checkbox' },
            { name: 'ConnectedTextArea', counterpart: 'TextArea' },
          ]}
        />
      </List>
    </Box>
  )
}
