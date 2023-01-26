import { Box, FlexBox, Text } from '@codecademy/gamut';
import { CertificateIcon } from '@codecademy/gamut-icons';
import { CheckerDense } from '@codecademy/gamut-patterns';

export const Divider: React.FC = () => {
  return (
    // the height and position properties are necessary for iOS devices
    <Box py={4} height={0} position="relative">
      <CheckerDense height="1px" display="flex" position="absolute" />
    </Box>
  );
};

export const CertificateComponent: React.FC = () => {
  return (
    <>
      <FlexBox alignItems="center">
        <FlexBox pr={4}>
          <CertificateIcon />
        </FlexBox>
        <Text variant="p-small" pl={4}>
          With <b>Certificate</b>
        </Text>
      </FlexBox>
    </>
  );
};
