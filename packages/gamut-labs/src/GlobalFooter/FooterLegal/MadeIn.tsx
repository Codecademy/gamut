import { Box } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

const ClickableSpan = styled.span`
  cursor: pointer;
`;

const AccessibleSpan = ({ children, onClick }: any) => (
  <ClickableSpan
    onClick={onClick}
    onKeyPress={onClick}
    role="button"
    tabIndex={0}
  >
    {children}
  </ClickableSpan>
);

const HeartContainer = styled(AccessibleSpan)`
  display: inline-block;
  filter: saturate(0.7);
  margin-right: 0.25rem;
  min-width: 1.75em;
  text-align: center;
`;

export type MadeInProps = {
  onClick?: (e: React.MouseEvent | React.KeyboardEvent) => void;
};

export const MadeIn: React.FC<MadeInProps> = ({ onClick }) => {
  return (
    <Box
      display={{ md: 'inline-block' }}
      textAlign={{ base: 'center', md: 'right' }}
    >
      <AccessibleSpan onClick={onClick}>Made</AccessibleSpan> with
      <HeartContainer aria-label="love" onClick={onClick}>
        ️❤️
      </HeartContainer>
      in <AccessibleSpan onClick={onClick}>NYC</AccessibleSpan> ©
      {` ${new Date().getFullYear()} `}{' '}
      <AccessibleSpan onClick={onClick}>Codecademy</AccessibleSpan>
    </Box>
  );
};
