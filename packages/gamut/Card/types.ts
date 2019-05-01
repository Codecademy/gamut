import { ReactNode } from 'react';

export interface CardButton {
  icon: ReactNode;
  title: string;
  action: () => void;
  withArrow: boolean;
}
