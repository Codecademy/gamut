import { Box } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

const HeartContainer = styled.span`
  display: inline-block;
  filter: saturate(0.7);
  margin-right: 0.25rem;
  min-width: 1.75em;
  text-align: center;
  cursor: pointer;
`;

const ClickableSpan = styled.span`
  cursor: pointer;
`;

export type MadeInProps = {
  onClick: (e: React.MouseEvent | React.KeyEvent) => void;
};

export const MadeIn: React.FC<MadeInProps> = ({ onClick }) => {
  const AccessibleSpan = ({ children }: any) => (
    <ClickableSpan
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
      tabIndex={0}
    >
      {children}
    </ClickableSpan>
  );

  return (
    <Box
      display={{ md: 'inline-block' }}
      textAlign={{ base: 'center', md: 'right' }}
    >
      <AccessibleSpan>Made</AccessibleSpan> with
      <HeartContainer aria-label="love">️❤️</HeartContainer>
      in <AccessibleSpan>NYC</AccessibleSpan> ©{` ${new Date().getFullYear()} `}{' '}
      <AccessibleSpan>Codecademy</AccessibleSpan>
    </Box>
  );
};
