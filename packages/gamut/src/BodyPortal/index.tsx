import React from 'react';
import ReactDOM from 'react-dom';

import { AppWrapper } from '../AppWrapper';

export const BodyPortal: React.FC = ({ children }) => {
  return ReactDOM.createPortal(
    <AppWrapper>{children}</AppWrapper>,
    document.body
  );
};
