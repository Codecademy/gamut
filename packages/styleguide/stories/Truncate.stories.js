import React from 'react';
import TruncateText from '../../gamut/src/Truncate';
import { CircleHeavyIcon } from '../../gamut-icons/src';

export default {
  component: TruncateText,
  title: 'Component/TruncateText',
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
      <h2>Default (nothing)</h2>
      <p>
        <TruncateText>{placeholderText}</TruncateText>
      </p>

      <h2>2 Line Container</h2>
      <p>
        <TruncateText lines={2}>{placeholderText}</TruncateText>
      </p>

      <h3>Fade</h3>
      <p>
        <TruncateText lines={2} truncateStyle="fade">
          {placeholderText}
        </TruncateText>
      </p>

      <h3>With Components</h3>
      <p>
        <TruncateText lines={2} truncateStyle="fade">
          hello world this is dude guy. <CircleHeavyIcon /> I put something in
          here
        </TruncateText>
      </p>
    </div>
  );
};

basicTruncate.story = {
  name: 'TruncateText',
};
