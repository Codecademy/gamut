import * as React from 'react';

import { Text } from '../../Typography';
import { DisclosureBodyWrapper } from '../elements';
import { getSpacing, renderButton } from '../helpers';
import { DisclosureBodyProps } from '../types';

export const DisclosureBody: React.FC<DisclosureBodyProps> = ({
  body,
  buttonType = 'TextButton',
  buttonPlacement = 'right',
  ctaCallback,
  ctaText,
  hasPanelBg = false,
  href,
  spacing = 'normal',
}) => {
  const buttonRequirements = ctaText && ctaCallback;

  const getLineHeight = spacing === 'compact' ? 'title' : 'base';
  const { verticalSpacing, horizontalSpacing } = getSpacing(spacing);
  return (
    <DisclosureBodyWrapper
      column
      hasPanelBg={hasPanelBg}
      mb={verticalSpacing}
      mx={horizontalSpacing}
    >
      <Text width="100%" lineHeight={getLineHeight}>
        {body}
      </Text>
      {buttonRequirements &&
        renderButton({
          buttonPlacement,
          buttonType,
          ctaCallback,
          ctaText,
          href,
        })}
    </DisclosureBodyWrapper>
  );
};
