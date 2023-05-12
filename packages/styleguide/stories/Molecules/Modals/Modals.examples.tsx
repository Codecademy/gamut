import { Box, Dialog, FlexBox, Modal, Text } from '@codecademy/gamut';
import { CodeCelebration } from '@codecademy/gamut-illustrations';

const modalProps = {
  isOpen: true,
  inline: true,
  onRequestClose: () => null,
  image: (
    <FlexBox bg="background-primary" center height="100%" p={4} width="100%">
      <CodeCelebration height="100%" />
    </FlexBox>
  ),
};

const children = (
  <>
    <Text smooth fontSize={14} my={12}>
      Optional 1-2 lines of explanation that provides relevant details. Lorem
      ipsum cras nulla massa odio ligula.
    </Text>
  </>
);

export const ImageModalExample: React.FC = () => {
  return (
    <Box>
      {['small', 'medium'].map((size) => (
        <Modal
          key={size}
          size={size as any}
          title={`${size.toUpperCase()} modal with image option`}
          {...modalProps}
        >
          {children}
        </Modal>
      ))}
    </Box>
  );
};

export const DialogExample: React.FC = () => {
  return (
    <Box>
      {['small', 'medium'].map((size) => (
        <Dialog key={size} isOpen image={modalProps.image}>
          {children}
        </Dialog>
      ))}
    </Box>
  );
};
