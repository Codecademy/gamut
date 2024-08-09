import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { ReactNode, useMemo } from 'react';
import * as React from 'react';

import { WithChildrenProp } from '..';
import { Box, FlexBox } from '../Box';
import { IconButton } from '../Button/IconButton';
import { FloatingCard } from '../FloatingCard/FloatingCard';
import { Text } from '../Typography';

const layoutVariants = system.variant({
  prop: 'layout',
  defaultVariant: 'message',
  variants: {
    message: {
      minHeight: '80px',
      gridTemplateAreas: `'message message close'`,
    },
    'icon-message': {
      gridTemplateAreas: `'icon message close'`,
      minHeight: '104px',
    },
    'title-message': {
      minHeight: '104px',
      gridTemplateAreas: `'message message close'`,
    },
  },
});

const ToastContainer = styled(FloatingCard)<StyleProps<typeof layoutVariants>>(
  system.css({
    display: 'grid',
    width: 360,
    py: 12,
    px: 16,
    pr: 12,
    columnGap: 12,
    gridTemplateColumns: '4rem 1fr 2rem',
  }),
  layoutVariants
);

const IconContainer = styled(FlexBox)(
  system.css({
    alignSelf: 'center',
    width: 64,
    height: 64,
    gridArea: 'icon',
    backgroundSize: 'contain',
  })
);

export interface ToastProps extends WithChildrenProp {
  title?: ReactNode;
  icon?: ReactNode;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  title,
  children,
  icon,
  onClose,
}) => {
  const layoutType = useMemo(() => {
    if (icon) return 'icon-message';
    if (title) return 'title-message';
    return 'message';
  }, [title, icon]);

  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === 'string') {
      return (
        <IconContainer
          gridArea="icon"
          borderRadius="full"
          backgroundImage={`url(${icon})`}
        />
      );
    }
    return (
      <IconContainer gridArea="icon" center>
        {icon}
      </IconContainer>
    );
  };

  return (
    <ToastContainer role="status" aria-live="polite" layout={layoutType}>
      {renderIcon()}
      <Box gridArea="message" py={4}>
        {title && (
          <Text variant="p-base" fontWeight="title" mb={4}>
            {title}
          </Text>
        )}
        <Text as="div" variant="p-small">
          {children}
        </Text>
      </Box>
      <IconButton
        onClick={onClose}
        size="small"
        variant="secondary"
        icon={MiniDeleteIcon}
        alignSelf="start"
        tip="Dismiss Toast"
        tipProps={{ placement: 'floating' }}
      />
    </ToastContainer>
  );
};
