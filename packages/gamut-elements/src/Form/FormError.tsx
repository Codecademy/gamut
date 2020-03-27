import React, { HTMLAttributes } from 'react';

const FormError: React.FC<HTMLAttributes<HTMLSpanElement>> = props => {
  return <span aria-live="assertive" {...props} />;
};

export default FormError;
