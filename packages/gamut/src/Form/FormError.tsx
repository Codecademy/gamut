import React, { HTMLAttributes } from 'react';

export const FormError: React.FC<HTMLAttributes<HTMLSpanElement>> = props => {
  return <span aria-live="assertive" {...props} />;
};

export default FormError;
