import { Background } from '@codecademy/gamut-styles';

export const SourceWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <Background bg="white" borderRadius="md" px={24} py={8}>
      {children}
    </Background>
  );
};
