import { Box } from '@codecademy/gamut';

export const SourceWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <Box bg="white" borderRadius="md" fontWeight={'bold'} px={24} py={8}>
      {children}
    </Box>
  );
};
