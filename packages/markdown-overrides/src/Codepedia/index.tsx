import React, { useRef, useState } from 'react';
import { TextButton } from '@codecademy/gamut';
import { SupportFilledIcon } from '@codecademy/gamut-icons';

import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { CodepediaPopover } from './Popover';

const RAW_ROOT =
  'https://raw.githubusercontent.com/codecademy/codepedia/main/codepedia';
const VIEW_ROOT = 'https://codecademy.github.io/codepedia/entries';

export type CodepediaProps = {
  concept: string;
  language?: string;
  overrides?: any;
};

export const Codepedia: React.FC<CodepediaProps> = ({
  children,
  concept,
  language,
  overrides,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');

  const parentRef = useRef<HTMLSpanElement>(null);

  const viewUrl = `${VIEW_ROOT}/${concept}/${language ? language : ''}`;
  const rawUrl = `${RAW_ROOT}/${concept}/${concept}${
    language ? `.${language}` : ''
  }.md`;

  // fetch the details directly from Codepedia
  // TODO: make a service for this request instead of relying on GitHub.
  React.useEffect(() => {
    (async () => {
      const resp = await fetch(rawUrl);
      const text = await resp.text();
      setContent(text);
    })();
  }, [rawUrl]);

  return (
    <>
      <span ref={parentRef}>
        <CodepediaBtn onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
          {children}
          <Icon size={12} />
        </CodepediaBtn>
      </span>

      <CodepediaPopover
        targetRef={parentRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        content={content}
        viewUrl={viewUrl}
        overrides={overrides}
      />
    </>
  );
};

const CodepediaBtn = styled(TextButton)<{ isOpen: boolean }>`
  :focus {
    box-shadow: none;
  }

  :focus-visible {
    box-shadow: ${colors.lightGreen} 0 0 0 2px;
  }

  span {
    background-color: ${(p) =>
      p.isOpen
        ? `${colors.lightGreen}FF`
        : `${colors.lightGreen}44`} !important;

    border-bottom: 1px dashed black;
    :hover {
      background-color: ${colors.lightGreen}FF !important;
    }
  }

  span {
    padding: 0 0 0.2rem 0;
    color: ${(p) => (p.isOpen ? colors.black : colors.navy)} !important;
  }
`;

const Icon = styled(SupportFilledIcon)`
  margin-top: -0.5rem;
  margin-right: -0.5rem;
  margin-left: 0.25rem;
`;
