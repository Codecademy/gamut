import React from 'react';
import ReactDOM from 'react-dom';

export const BodyPortal: React.FC = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};
