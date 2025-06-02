import { Box, List, ListCol, ListRow, Text } from '@codecademy/gamut';
import * as React from 'react';

import { LinkTo } from '~styleguide/blocks';

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
            <ListCol fill size="lg">
              <LinkTo id={`Atoms/FormInputs/${counterpart}`}>
                {counterpart}
              </LinkTo>
            </ListCol>
          </ListRow>
        );
      })}
    </>
  );
};

export const ConnectedFormInputsTable = () => {
  return (
    <Box mb={40} mt={16} mx={40}>
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
  );
};
