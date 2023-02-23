import {
  Provider as UniqueIdGeneratorProvider,
  ProviderProps,
} from '@inline-svg-unique-id/react';

export interface UniqueIdProviderProps extends ProviderProps {
  useUniqueIconIds?: boolean;
}

export const UniqueIdProvider: React.FC<UniqueIdProviderProps> = ({
  useUniqueIconIds = true,
  children,
}) => {
  if (!useUniqueIconIds) <>{children}</>;
  return (
    <UniqueIdGeneratorProvider idPrefix="custom-prefix">
      {children}
    </UniqueIdGeneratorProvider>
  );
};
