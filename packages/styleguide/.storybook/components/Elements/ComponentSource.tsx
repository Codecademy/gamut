import { OpenIcon } from '@codecademy/gamut-icons';
import { Anchor } from '@codecademy/gamut';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const SourceAnchor = styled(Anchor)(
  css({ height: '100%', alignContent: 'center' })
);

export const sourceAnchorProps = {
  icon: OpenIcon,
  iconPosition: 'right',
  target: '_blank',
} as const;

export const ComponentSource: React.FC<{
  repo: string;
  githubLink?: string;
}> = ({ repo, githubLink }) => {
  const npmLink =
    githubLink ?? `https://www.npmjs.com/package/@codecademy/${repo}`;
  return (
    <SourceAnchor href={npmLink} {...sourceAnchorProps}>
      @codecademy/{repo}
    </SourceAnchor>
  );
};
