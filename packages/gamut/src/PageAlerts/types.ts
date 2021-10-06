import { ComponentProps } from 'react';

import { Alert } from '../Alert';

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
  type: AlertProps['type'];
  message: string;
  permanent?: boolean;
};
