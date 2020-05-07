import React from 'react';
import { Meta } from '@storybook/addon-docs/dist/blocks';
import { withKnobs } from '@storybook/addon-knobs';

export const StoryMeta: typeof Meta = ({ decorators, ...metaProps }) => {
  const combinedDecorators = decorators;
  combinedDecorators.push(withKnobs);

  return <Meta decorators={combinedDecorators} {...metaProps} />;
};
