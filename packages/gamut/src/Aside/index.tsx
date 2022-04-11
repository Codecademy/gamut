import { GamutIconProps } from '@codecademy/gamut-icons';
import React from 'react';

import { ButtonProps, FillButton, StrokeButton } from '../Button';
import { FloatingCardProps } from '../FloatingCard/FloatingCard';
import { List, ListCol, ListRow } from '../List';
import { Text } from '../Typography';
import { AsideContainer } from './elements';

interface AsideListItemProps {
  icon: React.ComponentType<GamutIconProps>;
  numberOfItems: number;
  /** Each item needs to have a unique ID */
  id: string;
}
interface AsideButtonProps extends Pick<ButtonProps, 'href' | 'onClick'> {
  children: React.ReactNode;
}
export interface AsideProps extends Pick<FloatingCardProps, 'pattern'> {
  header: string;
  headerLevel: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  subtitle: string;
  listItems: AsideListItemProps[];
  primaryButton: AsideButtonProps; // FillButton
  secondaryButton: AsideButtonProps; // StrokeButton
}

// update FloatingCard docs
export const Aside: React.FC<AsideProps> = ({
  header,
  headerLevel,
  listItems,
  pattern,
  primaryButton,
  secondaryButton,
  subtitle,
  ...rest
}) => {
  return (
    <AsideContainer as="aside" pattern={pattern} p={32} {...rest}>
      <Text as={headerLevel} gridArea="header">
        {header}
      </Text>
      <Text gridArea="subtitle" mb={48}>
        {subtitle}
      </Text>
      <List variant="plain">
        {listItems.map(({ icon: Icon, numberOfItems, id }) => (
          <ListRow key={id}>
            <ListCol>
              <Icon size={24} />
            </ListCol>
            <ListCol size="lg" fill>
              {numberOfItems} items
            </ListCol>
          </ListRow>
        ))}
      </List>
      <FillButton gridArea="primaryButton" mt={48} mr={16} {...primaryButton} />
      <StrokeButton gridArea="secondaryButton" ml={4} {...secondaryButton} />
    </AsideContainer>
  );
};
