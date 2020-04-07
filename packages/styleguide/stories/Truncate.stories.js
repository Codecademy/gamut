import React from 'react';
import TruncateText from '../../gamut/src/Truncate';
import { CircleHeavyIcon } from '../../gamut-icons/src';

export default {
  component: TruncateText,
  title: 'Component/Truncate',
};

const placeholderText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
velit esse cillum dolore eu fugiat nulla pariatur.
`;

export const basicTruncate = () => {
  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <h4>Default (nothing)</h4>
      <p>
        <TruncateText>{placeholderText}</TruncateText>
      </p>

      <h4>With text</h4>
      <p>
        <TruncateText lines={2}>{placeholderText}</TruncateText>
      </p>

      <h4>With Components</h4>
      <p>This also works with markup</p>
      <p>
        <TruncateText lines={2}>
          <strong>I am a strong</strong>
          {placeholderText}
          <em>I am another em</em>
        </TruncateText>
      </p>
    </div>
  );
};

basicTruncate.story = {
  name: 'Truncate',
};
