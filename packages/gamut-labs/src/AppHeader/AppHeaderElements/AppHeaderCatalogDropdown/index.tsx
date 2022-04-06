import {
  Anchor,
  Box,
  Column,
  FlexBox,
  LayoutGrid,
  Text,
  TextButton,
} from '@codecademy/gamut';
import { pxRem, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import cx from 'classnames';
import React, { useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';

import {
  DropdownAnchor,
  DropdownIcon,
  StyledDropdown,
  StyledText,
} from '../../shared';
import { AppHeaderCatalogDropdownItem, AppHeaderClickHandler } from '../types';

type AppHeaderCatalogDropdownProps = {
  action: AppHeaderClickHandler;
  item: AppHeaderCatalogDropdownItem;
};

const StyledTitle = styled(Text)`
  font-size: ${pxRem(12)};
  font-family: ${theme.fontFamily.accent};
  font-weight: ${theme.fontWeight.title};
  margin-bottom: ${pxRem(6)};
`;

const StyledDescription = styled(Text)`
  font-size: ${pxRem(11)};
  font-family: ${theme.fontFamily.base};
  line-height: ${pxRem(19)};
`;

const StyledSubheader = styled(Text)`
  font-size: ${pxRem(12)};
  font-family: ${theme.fontFamily.base};
  font-weight: ${theme.fontWeight.title};
  color: ${theme.colors['navy-500']};
  line-height: ${pxRem(24)};
  margin-bottom: ${pxRem(2)};
`;

const StyledAnchor = styled(Anchor)`
  font-size: ${pxRem(14)};
  font-family: ${theme.fontFamily.base};
  line-height: ${pxRem(32)};
`;

const StyledColumn = styled(Column)`
  border-bottom: ${theme.borders[1]};
`;
export const AppHeaderCatalogDropdown: React.FC<AppHeaderCatalogDropdownProps> = ({
  action,
  item,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [height, setHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (containerRef.current) {
      const { height } = containerRef.current.getBoundingClientRect();
      setHeight(height);
    }
  }, [containerRef, isOpen]);

  const toggleIsOpen = () => setIsOpen((prev) => !prev);

  const handleOnClick = (event: React.MouseEvent) => {
    toggleIsOpen();
    if (!isOpen) {
      action(event, item);
    }
  };

  return (
    <>
      <DropdownAnchor
        ref={buttonRef}
        onClick={handleOnClick}
        title={item.text}
        variant="interface"
        tabIndex="-1"
        aria-expanded={isOpen}
        aria-haspopup
      >
        <StyledText
          fontWeight={isOpen ? 'bold' : 'normal'}
          textAlign="center"
          title={item.text}
        >
          {item.text}
        </StyledText>
        <DropdownIcon
          aria-label="dropdown"
          className={cx(isOpen && 'open')}
          size={12}
        />
      </DropdownAnchor>
      <StyledDropdown
        style={{
          top: '2.50rem',
          width: pxRem(586),
        }}
        initial={{ borderWidth: 0, height: 0 }}
        animate={{
          borderWidth: isOpen ? 1 : 0,
          height: isOpen ? height : 0,
        }}
        transition={{ duration: 0.175 }}
        aria-hidden={!isOpen}
      >
        <LayoutGrid ref={containerRef}>
          {item.popover.map((section) => (
            <StyledColumn size={12}>
              <LayoutGrid>
                <Column size={4}>
                  <Box background={theme.colors['gray-100']} p={16}>
                    <StyledTitle>{section.title}</StyledTitle>
                    <StyledDescription>{section.description}</StyledDescription>
                  </Box>
                </Column>
                <Column size={8} p={16}>
                  <FlexBox
                    maxHeight={
                      // This is so columns without subheaders stay grouped in threes
                      section.title !== 'Popular courses' ? '7rem' : '8rem'
                    }
                    flexDirection="column"
                    flexWrap="wrap"
                  >
                    {section.links.map((link) =>
                      link.type === 'subheader' ? (
                        <StyledSubheader>{link.text}</StyledSubheader>
                      ) : (
                        <Box minWidth="200px">
                          <StyledAnchor variant="interface" href={link.href}>
                            {link.text}
                          </StyledAnchor>
                        </Box>
                      )
                    )}
                  </FlexBox>
                </Column>
              </LayoutGrid>
            </StyledColumn>
          ))}

          <Column size={12} py={12}>
            <TextButton href="/catalog" width="min-content">
              Explore full catalog
            </TextButton>
          </Column>
        </LayoutGrid>
      </StyledDropdown>
    </>
  );
};
