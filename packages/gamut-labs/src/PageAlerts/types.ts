// eslint-disable-next-line gamut/import-paths
import { Alert } from '@codecademy/gamut/src/Alert';
import { ComponentProps } from 'react';

type AlertProps = Required<ComponentProps<typeof Alert>>;

type LimitedCTAProps = 'target' | 'href' | 'children' | 'onClick' | 'text';

export type PageAlert = {
  cta?: {
    [Prop in Extract<
      keyof AlertProps['cta'],
      LimitedCTAProps
    >]?: AlertProps['cta'][Prop];
  };
  onClose?: () => void;
  type: Exclude<AlertProps['type'], 'subtle'>;
  message: string;
  permanent?: boolean;
};
