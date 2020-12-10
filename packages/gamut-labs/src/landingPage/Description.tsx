import React from 'react';
import styled from '@emotion/styled';
import { BaseProps } from './types';

import {
  Markdown,
  MarkdownAnchor,
  MarkdownAnchorProps,
} from '@codecademy/gamut';

export const DescriptionContainer = styled.div`
  margin: 2rem 0 0;
  max-width: 38rem;
`;

export type DescriptionProps = {
  text: string;
} & Pick<BaseProps, 'onMarkdownLinkClick'>;

export const Description: React.FC<DescriptionProps> = ({
  text,
  onMarkdownLinkClick,
}) => (
  <Markdown
    text={text}
    skipDefaultOverrides={{ a: true }}
    overrides={{
      a: {
        component: ({ href, children }: MarkdownAnchorProps) => (
          <MarkdownAnchor href={href} onClick={onMarkdownLinkClick}>
            {children}
          </MarkdownAnchor>
        ),
        // From https://github.com/bevacqua/insane/blob/master/defaults.js
        allowedAttributes: [
          'title',
          'accesskey',
          'href',
          'name',
          'target',
          'aria-label',
          'onclick',
        ],
      },
    }}
  />
);
