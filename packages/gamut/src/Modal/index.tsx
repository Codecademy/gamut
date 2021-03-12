import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useCallback } from 'react';

import { Box, FlexBox } from '../Box';
import { FillButton, IconButton, TextButton } from '../Button';
import { Overlay, OverlayProps } from '../Overlay';
import { Pattern } from '../Pattern';
import { VisualTheme } from '../theming/VisualTheme';

const modes = variant({
  prop: 'mode',
  variants: {
    light: {
      textColor: 'navy',
      backgroundColor: 'white',
      borderColor: 'navy',
    },
    dark: {
      textColor: 'white',
      backgroundColor: 'navy',
      borderColor: 'white',
    },
  },
});

const shroudColor = {
  dark: 'rgba(0,0,0, .75)',
  light: 'rgba(255, 255, 255, 0.95)',
};

const ShroudedOverlay = styled(Overlay)<{ mode?: VisualTheme }>(
  ({ mode = 'light' }) => `
  background-color: ${shroudColor[mode]};
`
);

const ModalWrapper = styled.div(modes, ({ theme }) => {
  return css`
    position: relative;
    z-index: 1;
    max-width: calc(100vw - 2rem);
    width: 400px;
    border-width: 1px;
    border-style: solid;
    border-radius: 2px;
  `;
});

const ModalShadow = styled(Pattern)(
  ({ theme }) => css`
    width: 100%;
    height: 100%;
    position: absolute;
    top: ${theme.spacing[8]};
    left: -${theme.spacing[8]};
  `
);

const ModalForeground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const ModalBody = styled.div(({ theme }) => {
  return css`
    position: relative;
    background-color: inherit;
    display: grid;
    padding: ${theme.spacing[24]};
    grid-template-columns: 1fr min-content 2rem;
    grid-template-rows: repeat(3, auto);
    grid-row-gap: ${theme.spacing[12]};
    grid-column-gap: ${theme.spacing[16]};
    grid-template-areas:
      'title title close'
      'children children children'
      'cancel confirm confirm';
  `;
});

const Title = styled(Box)`
  color: inherit;
  grid-area: title;
`;

const CloseButton = styled.div`
  grid-area: close;
`.withComponent(IconButton);

const Content = styled(Box)`
  color: inherit;
  grid-area: children;
`;

const ConfirmButton = styled(FillButton)`
  grid-area: confirm;
`;

const CancelButton = styled(TextButton)`
  grid-area: cancel;
`.withComponent((props: ModalProps['cancelCta']) => (
  <FlexBox justifyContent="flex-end">
    <TextButton {...props} />
  </FlexBox>
));

export interface ModalProps
  extends Pick<OverlayProps, 'clickOutsideCloses' | 'escapeCloses'> {
  mode?: VisualTheme;
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  confirmCta: React.ComponentProps<typeof FillButton>;
  cancelCta?: React.ComponentProps<typeof TextButton>;
  onRequestClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  mode = 'light',
  title,
  children,
  confirmCta,
  cancelCta,
  onRequestClose,
  ...rest
}) => {
  const handleClose = useCallback(() => {
    onRequestClose?.();
  }, [onRequestClose]);

  return (
    <ShroudedOverlay mode={mode} onRequestClose={handleClose} {...rest}>
      <ModalWrapper mode={mode}>
        <ModalShadow name="dotsDense" />
        <ModalForeground />
        <ModalBody>
          <Title
            as="h2"
            margin={0}
            fontSize={20}
            lineHeight="base"
            fontWeight="title"
          >
            {title}
          </Title>
          <CloseButton
            mode={mode}
            size="small"
            icon={MiniDeleteIcon}
            onClick={handleClose}
          />
          <Content fontSize={16} lineHeight="base">
            {children}
          </Content>
          {cancelCta && (
            <CancelButton mode={mode} onClick={handleClose} {...cancelCta} />
          )}
          <ConfirmButton mode={mode} onClick={handleClose} {...confirmCta} />
        </ModalBody>
      </ModalWrapper>
    </ShroudedOverlay>
  );
};
