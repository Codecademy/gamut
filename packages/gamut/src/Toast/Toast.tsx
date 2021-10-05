import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { ReactNode, useMemo } from 'react';

import { Box, FlexBox } from '../Box';
import { IconButton } from '../Button/IconButton';
import { FloatingCard } from '../FloatingCard/FloatingCard';
import { Text } from '../Typography';

const layoutVariants = system.variant({
  prop: 'layout',
  defaultVariant: 'message',
  variants: {
    message: {
      gridTemplateAreas: `'message message close'`,
    },
    'icon-message': {
      gridTemplateAreas: `'icon message close'`,
    },
    'title-message': {
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
    width: `${(props: { width?: number }) => props.width}`,
    height: `${(props: { height?: number }) => props.height}`,
    gridArea: 'icon',
    backgroundSize: 'contain',
  })
);

export type ToastProps = {
  title?: ReactNode;
  icon?: ReactNode;
  iconSize?: number;
  onClose: () => void;
};

export const Toast: React.FC<ToastProps> = ({
  title,
  children,
  icon,
  iconSize = 64,
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
          borderRadius="50%"
          backgroundImage={`url(${icon})`}
          height={iconSize}
          width={iconSize}
        />
      );
    }
    return (
      <IconContainer gridArea="icon" height={iconSize} width={iconSize} center>
        {icon}
      </IconContainer>
    );
  };

  const messageDisplayProps = title
    ? null
    : {
        display: 'flex',
        alignItems: 'center',
      };

  return (
    <ToastContainer role="status" aria-live="polite" layout={layoutType}>
      {renderIcon()}
      <Box gridArea="message" py={4} {...messageDisplayProps}>
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
        aria-label="Dismiss Toast"
      />
    </ToastContainer>
  );
};
