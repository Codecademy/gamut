import React, { useCallback, useRef, useState } from 'react';
import { TextButton } from '@codecademy/gamut';
import { SupportFilledIcon } from '@codecademy/gamut-icons';

import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { CodepediaPopover, LinkProperties } from './Popover';
import { getLoadUrl, getViewUrl } from './urlHelpers';
import { PopoverProps } from '@codecademy/gamut-labs';

export type CodepediaProps = Omit<PopoverProps, 'isOpen' | 'targetRef'> & {
  concept: string;
  language?: string;
  overrides?: any;
  linkOverrides: LinkProperties;
};

export const Codepedia: React.FC<CodepediaProps> = ({
  children,
  concept,
  language,
  overrides,
  linkOverrides = {},
  ...popoverProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');

  const parentRef = useRef<HTMLSpanElement>(null);

  const loadDefault = useCallback(async () => {
    const resp = await fetch(getLoadUrl(concept, language));
    const text = await resp.text();
    return text;
  }, [concept, language]);

  // fetch the details directly from Codepedia
  // TODO: make a service for this request instead of relying on GitHub.
  React.useEffect(() => {
    (async () => {
      const content = await (linkOverrides.onLoad
        ? linkOverrides.onLoad()
        : loadDefault());
      setContent(content);
    })();
  }, [loadDefault, linkOverrides]);

  // set a default view link if the caller didn't provide one
  if (!linkOverrides.href && !linkOverrides.onViewClick) {
    linkOverrides.href = getViewUrl(concept, language);
  }

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
        overrides={overrides}
        linkProperties={linkOverrides}
        {...popoverProps}
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
