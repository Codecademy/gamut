import React from 'react';

const TestComponent = ({ onClick, ...props }) => (
  <div {...props} data-testid="container">
    <button type="button" onClick={onClick} data-testid="button">
      A test component
    </button>
  </div>
);

export default TestComponent;
