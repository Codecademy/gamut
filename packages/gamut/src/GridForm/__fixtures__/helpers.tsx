import * as React from 'react';

import { ConnectedForm, WithChildrenProp } from '../..';

interface FormContextProps extends WithChildrenProp {
  mode?: 'onChange' | 'onSubmit';
}

export const FormContext: React.FC<FormContextProps> = ({
  mode = 'onSubmit',
  children,
}) => {
  return (
    <ConnectedForm validation={mode} onSubmit={() => null}>
      {children}
    </ConnectedForm>
  );
};
