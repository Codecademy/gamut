import {
  Provider as UniqueIdGeneratorProvider,
  ProviderProps,
} from '@inline-svg-unique-id/react';

export interface UniqueIdProviderProps extends ProviderProps {
  useUniqueIconIds?: boolean;
}

export const UniqueIdProvider: React.FC<UniqueIdProviderProps> = (
  { useUniqueIconIds = true, children },
  ...rest
) => {
  if (!useUniqueIconIds) <>{children}</>;
  return (
    <UniqueIdGeneratorProvider {...rest}>{children}</UniqueIdGeneratorProvider>
  );
};
