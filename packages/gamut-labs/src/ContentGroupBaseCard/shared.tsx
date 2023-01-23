import { Box } from '@codecademy/gamut';
import { CheckerDense } from '@codecademy/gamut-patterns';

export const Divider: React.FC = () => {
  return (
    // the height and position properties are necessary for iOS devices
    <Box py={4} height={0} position="relative">
      <CheckerDense height="1px" display="flex" position="absolute" />
    </Box>
  );
};
