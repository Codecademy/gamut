import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { useMemo } from 'react';

import { IconButton } from '../Button/IconButton';
import { Pattern } from '../Pattern';
import { Text } from '../Typography';

const ToastWrapper = styled.div(
  system.css({
    width: 360,
    maxWidth: 360,
    position: 'relative',
    zIndex: 1,
    display: 'grid',
  })
);

const ToastShadow = styled(Pattern)(
  system.css({
    textColor: 'text',
    width: 1,
    height: 1,
    position: 'absolute',
    top: '.5rem',
    left: '-.5rem',
  })
);

const layoutVariants = system.variant({
  prop: 'layout',
  defaultVariant: 'message',
  variants: {
    message: {
      gridTemplateAreas: `'message message'
      'message message'`,
      minHeight: '64px',
    },
    'title-message': {
      gridTemplateAreas: `'title title'
      'message message'`,
      minHeight: '92px',
    },
    'icon-message': {
      gridTemplateAreas: `'icon message'
      'icon message'`,
      minHeight: '92px',
    },
    'icon-title-message': {
      gridTemplateAreas: `'icon title'
      'icon message'`,
      minHeight: '92px',
    },
  },
});

const ToastBody = styled.div(
  system.css({
    zIndex: 1,
    bg: 'background',
    display: 'grid',
    gridTemplateColumns: '1fr 2rem',
    p: 4,
    border: 1,
  }),
  layoutVariants
);

const ToastContent = styled.div<StyleProps<typeof layoutVariants>>(
  system.css({
    display: 'grid',
    p: 12,
    columnGap: 12,
    gridTemplateColumns: '4rem 1fr',
    gridTemplateRows: 'min-content 1fr',
  }),
  layoutVariants
);

const IconPlaceholder = styled.div(
  system.css({
    bg: 'text',
    width: 64,
    height: 64,
    gridArea: 'icon',
    borderRadius: '50%',
  })
);

export const Toast: React.FC<{
  title?: string;
  message: string;
  icon?: React.ReactNode;
  onClose: () => void;
}> = ({ title, message, icon, onClose }) => {
  const layoutType = useMemo(() => {
    if (title && icon) return 'icon-title-message';
    if (title) return 'title-message';
    if (icon) return 'icon-message';
    return 'message';
  }, [title, icon]);

  return (
    <ToastWrapper>
      <ToastShadow name="checkerDense" />
      <ToastBody>
        <ToastContent layout={layoutType}>
          {icon && <IconPlaceholder />}
          {title && (
            <Text variant="p-base" fontWeight="title" gridArea="title">
              {title}
            </Text>
          )}
          <Text variant="p-small" gridArea="message">
            {message}
          </Text>
        </ToastContent>
        <IconButton
          onClick={onClose}
          size="small"
          variant="secondary"
          icon={MiniDeleteIcon}
          alignSelf="start"
        />
      </ToastBody>
    </ToastWrapper>
  );
};
