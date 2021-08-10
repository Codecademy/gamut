import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ComponentProps } from 'react';

import { Box } from '../Box';
import { FillButton, IconButton, TextButton } from '../Button';
import { FloatingCard } from '../FloatingCard/FloatingCard';
import { Overlay, OverlayProps } from '../Overlay';
import { Text } from '../Typography';

const ShroudedOverlay = styled(Overlay)(system.css({ bg: 'shadow-opaque' }));

interface DialogButtonProps {
 children: typeof FillButton['children'];
 onClick?: typeof FillButton['onClick'];
 href?: typeof FillButton['href'];
};
export interface DialogProps
  extends Pick<
    OverlayProps,
    'isOpen' | 'onRequestClose' | 'clickOutsideCloses' | 'escapeCloses'
  > {
  size?: ComponentProps<typeof DialogContainer>['size'];
  title: React.ReactNode;
  children: React.ReactNode;
  variant?: 'danger' | 'primary';
  confirmCta: DialogButtonProps;
  cancelCta?: DialogButtonProps;
}

const DialogContainer = styled(FloatingCard)(
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
      medium: { width: '540px', minHeight: '240px' },
    },
  })
);

export const Dialog: React.FC<DialogProps> = ({
  title,
  children,
  confirmCta,
  cancelCta,
  onRequestClose,
  size = 'small',
  variant,
  ...rest
}) => {
  const onConfirm: DialogButtonProps['onClick'] = (e) => {
    onRequestClose();
    confirmCta.onClick?.(e);
  };

  const onCancel: DialogButtonProps['onClick'] = (e) => {
    onRequestClose();
    cancelCta?.onClick?.(e);
  };

  return (
    <ShroudedOverlay onRequestClose={onCancel as () => void} {...rest}>
      <DialogContainer
        size={size}
        aria-hidden="false"
        aria-modal="true"
        role="dialog"
      >
        <Text as="h2" fontSize={20} lineHeight="base" gridArea="title">
          {title}
        </Text>
        <IconButton
          aria-label="Close Dialog"
          size="small"
          alignSelf="start"
          variant="secondary"
          icon={MiniDeleteIcon}
          onClick={onCancel}
          gridArea="close"
        />
        <Box as="div" gridArea="content" data-testid="dialog-content">
          {children}
        </Box>
        {cancelCta && (
          <TextButton
            {...cancelCta}
            onClick={onCancel}
            justifySelf="end"
            gridArea="cancel"
          />
        )}
        <FillButton
          {...confirmCta}
          onClick={onConfirm}
          gridArea="confirm"
          variant={variant}
        />
      </DialogContainer>
    </ShroudedOverlay>
  );
};
