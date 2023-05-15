import { Box, FlexBox, Modal, Text } from '@codecademy/gamut';
import { CodeCelebration } from '@codecademy/gamut-illustrations';

const modalProps = {
  isOpen: true,
  inline: true,
  onRequestClose: () => null,
  views: [
    {
      title: 'First view',
      nextCta: { children: 'Next' },
      cancelCta: { children: 'Close' },
      children: <>Hey for the first time</>,
    },
    {
      title: 'Second view',
      nextCta: { children: 'Next' },
      cancelCta: { children: 'Close' },
      children: <>Hey for the second time</>,
    },
    {
      title: 'Third view',
      confirmCta: { children: 'Done' },
      cancelCta: { children: 'Close' },
      children: <>Last one</>,
    },
  ],
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
        />
      ))}
    </Box>
  );
};
