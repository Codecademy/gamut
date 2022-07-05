import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import React, { ComponentProps, useRef, useState } from 'react';

import { Box } from '../Box';
import { FillButton, IconButton, TextButton } from '../Button';
import { Overlay } from '../Overlay';
import { Text } from '../Typography';
import { ModalContainer, ModalContainerProps } from './elements';
import { ModalBaseProps } from './types';

interface DialogButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: ComponentProps<typeof FillButton>['onClick'];
  disabled?: boolean;
}

export interface TwoScreenModalProps extends ModalBaseProps {
  title: ModalBaseProps['title'];
  secondTitle: ModalBaseProps['title'];
  size?: Exclude<ModalContainerProps['size'], 'fluid'>;
  variant?: Extract<
    ComponentProps<typeof FillButton>['variant'],
    'primary' | 'danger'
  >;
  confirmCta: DialogButtonProps;
  cancelCta?: DialogButtonProps;
  nextCta: DialogButtonProps;
  secondScreen: React.ReactNode;
  closeDisabled?: boolean;
  scrollable?: boolean;
}

export const TwoScreenModal: React.FC<TwoScreenModalProps> = ({
  title,
  secondTitle,
  variant,
  children,
  confirmCta,
  cancelCta,
  onRequestClose,
  nextCta,
  secondScreen,
  closeDisabled,
  scrollable = false,
  size = 'small',
  ...rest
}) => {
  const onConfirm: DialogButtonProps['onClick'] = (e) => {
    confirmCta.onClick?.(e);
  };

  const onCancel: DialogButtonProps['onClick'] = (e) => {
    onRequestClose();
    cancelCta?.onClick?.(e);
  };

  const onNext: DialogButtonProps['onClick'] = (e) => {
    setShowSecondScreen(true);
    buttonRef.current?.focus();
    nextCta?.onClick?.(e);
  };

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [showSecondScreen, setShowSecondScreen] = useState(false);
  return (
    <Overlay shroud onRequestClose={onCancel as () => void} {...rest}>
      <ModalContainer
        size={size}
        aria-hidden="false"
        aria-modal="true"
        role="dialog"
        layout="dialog"
      >
        {title && (
          <Text
            as="h2"
            fontSize={20}
            lineHeight="base"
            gridArea="title"
            aria-live="assertive"
          >
            {showSecondScreen ? secondTitle : title}
          </Text>
        )}
        <IconButton
          aria-label="Close Dialog"
          size="small"
          alignSelf="start"
          icon={MiniDeleteIcon}
          onClick={onCancel}
          disabled={closeDisabled}
          gridArea="close"
          ref={buttonRef}
        />
        <Box
          as="div"
          overflowY={scrollable ? 'auto' : 'visible'}
          gridArea="content"
          data-testid="dialog-content"
        >
          {showSecondScreen ? secondScreen : children}
        </Box>
        {cancelCta && (
          <TextButton
            {...cancelCta}
            variant="secondary"
            onClick={onCancel}
            justifySelf="end"
            gridArea="cancel"
          />
        )}
        {showSecondScreen ? (
          <FillButton
            {...confirmCta}
            variant={variant}
            onClick={onConfirm}
            gridArea="confirm"
          />
        ) : (
          <FillButton
            {...nextCta}
            variant={variant}
            onClick={onNext}
            gridArea="confirm"
          />
        )}
      </ModalContainer>
    </Overlay>
  );
};
