import { Markdown as MarkdownBase, Box } from '@codecademy/gamut';
import { CloseIcon, InformationalIcon } from '@codecademy/gamut-icons';
import { Popover } from '../../experimental';
import { Loading } from '../Loading';
import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';
import { ManyOverrideSettings } from '@codecademy/gamut/dist/Markdown/libs/overrides';
import { TextButton } from '@codecademy/gamut/src/Button';

const RAW_ROOT =
  'https://raw.githubusercontent.com/codecademy/codepedia/main/codepedia';
const VIEW_ROOT = 'https://codecademy.github.io/codepedia/entries';

export type CodepediaProps = {
  concept: string;
  language: string;
  overrides?: ManyOverrideSettings;
};

export const Codepedia: React.FC<CodepediaProps> = ({
  children,
  concept,
  language,
  overrides,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [content, setContent] = React.useState('');

  const parentRef = React.useRef<HTMLSpanElement>(null);

  const VIEW_URL = `${VIEW_ROOT}/${concept}/${language ? language : ''}`;
  const RAW_URL = `${RAW_ROOT}/${concept}/${concept}${
    language ? `.${language}` : ''
  }.md`;

  // fetch the details directly from Codepedia
  // TODO: make a service for this request instead of relying on GitHub.
  React.useEffect(() => {
    (async () => {
      const resp = await fetch(RAW_URL);
      const text = await resp.text();
      setContent(text);
    })();
  }, [RAW_URL]);

  return (
    <>
      <span ref={parentRef}>
        <CodepediaBtn onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
          {children} <InformationalIcon />
        </CodepediaBtn>
      </span>

      <SPopover isOpen={isOpen} targetRef={parentRef} offset={6}>
        <SBox bordered>
          <SContainer>
            <TopBar>
              <NeutralTextButton href={VIEW_URL} target="_blank">
                View on Codepedia
              </NeutralTextButton>
              <NeutralTextButton onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </NeutralTextButton>
            </TopBar>

            {content ? (
              <MiniMarkdown overrides={overrides} text={content} />
            ) : (
              <Loading />
            )}
          </SContainer>
        </SBox>
      </SPopover>
    </>
  );
};

const SPopover = styled(Popover)`
  box-shadow: -3px 4px 0 0 ${colors.navy}FF;
  border-radius: 1px;
  padding: 0;
  left: 4.5rem !important;
`;

const SContainer = styled.div`
  max-width: 25vw;
  max-height: 21rem;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.5rem;
`;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.lightGreen};
  padding: 0.3rem;
`;

const NeutralTextButton = styled(TextButton)`
  color: ${colors.navy} !important;
  span {
    color: ${colors.navy} !important;
  }
  :hover span {
    background-color: ${colors.lightGreen}33 !important;
  }
  :focus {
    box-shadow: none;
  }
  :focus-visible {
    box-shadow: ${colors.lightGreen} 0 0 0 2px;
  }
`;

const SBox = styled(Box)`
  background-color: ${colors.paleGreen};
`;

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
    :hover {
      background-color: ${colors.lightGreen}FF !important;
    }
  }

  span {
    padding: 0 0 0.2rem 0;
    color: ${(p) => (p.isOpen ? colors.black : colors.navy)} !important;
  }
`;

const MiniMarkdown = styled(MarkdownBase)`
  margin: 0;
  padding: 0 1.25rem;
  overflow-y: auto;
  h1 {
    font-size: 1.5rem;
  }
  h2 {
    font-size: 1.2rem;
  }
`;
