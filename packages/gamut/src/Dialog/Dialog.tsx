import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { styledConfig, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ComponentProps } from 'react';

import { FillButton, IconButton, TextButton } from '../Button';
import { FloatingCard } from '../Card';
import { Text } from '../Typography';

const DialogContainer = styled(
  FloatingCard,
  styledConfig(['size'])
)(
  system.variant({
    prop: 'size',
    defaultVariant: 'small',
    base: {
      display: 'grid',
      p: 24,
      rowGap: 12,
      columnGap: 16,
      gridTemplateColumns: '1fr min-content 2rem',
      gridTemplateRows: 'max-content 1fr max-content',
      gridTemplateAreas: `'title title close'
  'content content content'
  'cancel confirm confirm'`,
    },
    variants: {
      small: { width: '400px', minHeight: '170px' },
      medium: { width: '640px', minHeight: '240px' },
    },
  })
);

export type DialogProps = {
  size?: ComponentProps<typeof DialogContainer>['size'];
  title: React.ReactNode;
  children: React.ReactNode;
  confirmCta: {
    children: React.ReactNode;
    onClick?: () => void;
  };
  cancelCta?: {
    children: React.ReactNode;
    onClick?: () => void;
  };
};

export const Dialog: React.FC<DialogProps> = ({
  size = 'small',
  title,
  children,
  confirmCta,
  cancelCta,
}) => {
  return (
    <DialogContainer
      size={size}
      aria-hidden="false"
      aria-modal="true"
      role="dialog"
      pattern="checkerDense"
    >
      <Text
        as="h2"
        fontSize={size === 'medium' ? 22 : 20}
        lineHeight="base"
        gridArea="title"
      >
        {title}
      </Text>
      <IconButton
        aria-label="Close Dialog"
        size="small"
        alignSelf="start"
        variant="secondary"
        icon={MiniDeleteIcon}
        onClick={confirmCta.onClick}
        gridArea="close"
      />
      <Text as="p" gridArea="content">
        {children}
      </Text>
      {cancelCta?.children && (
        <TextButton {...cancelCta} justifySelf="end" gridArea="cancel" />
      )}
      <FillButton {...confirmCta} gridArea="confirm" />
    </DialogContainer>
  );
};
