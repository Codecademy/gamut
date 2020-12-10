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
        component: (props: MarkdownAnchorProps) => (
          <MarkdownAnchor href={props.href} onClick={onMarkdownLinkClick}>
            {props.children}
          </MarkdownAnchor>
        ),
      },
    }}
  />
);
