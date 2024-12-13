import * as React from 'react';

import { ConnectedForm } from '../../ConnectedForm';
import { WithChildrenProp } from '../../utils';

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
