import * as React from 'react';

import { Box } from '../Box';
import { Modal } from './Modal';

export const ModalFigmaInstanceExample: React.FC = () => {
  const [open, setOpen] = React.useState(true);

  if (!open) return null;

  return (
    <Modal
      size="small"
      title="Headline"
      views={[{
        title: 'Headline',
        children: (
          <>
            <Box
              alignItems="center"
              background="background"
              borderRadius="sm"
              display="flex"
              height={62}
              justifyContent="center"
              mb={32}
              width={128}
            >
              {/* Image Placeholder */}
            </Box>
            <Box pb={32}>
              Optional 1-2 lines of explanation that provides relevant details. Lorem ipsum cras nulla massa odio ligula.
            </Box>
          </>
        ),
        primaryCta: {
          children: 'Primary',
          actionType: 'confirm',
          onClick: () => {
            setOpen(false);
            alert('Primary action clicked');
          },
          variant: 'primary',
        },
        secondaryCta: {
          children: 'Secondary',
          actionType: 'cancel',
          onClick: () => {
            setOpen(false);
            alert('Secondary action clicked');
          },
        },
      }]}
      onRequestClose={() => setOpen(false)}
    />
  );
};

export default ModalFigmaInstanceExample;
