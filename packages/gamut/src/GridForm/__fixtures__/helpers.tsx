import * as React from 'react';

import { ConnectedForm, GenericChildrenType } from '../..';

interface FormContextProps extends GenericChildrenType {
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
