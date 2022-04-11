import { GamutIconProps } from '@codecademy/gamut-icons';
import React from 'react';

import { ButtonProps, FillButton, StrokeButton } from '../Button';
import { FloatingCard, FloatingCardProps } from '../FloatingCard/FloatingCard';
import { List, ListCol, ListRow } from '../List';
import { Text } from '../Typography';

interface AsideListItemProps {
  /** Gamut icon component */
  icon: React.ComponentType<GamutIconProps>;
  /** Number of items for list item */
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
    <FloatingCard as="aside" pattern={pattern} {...rest}>
      <Text as={headerLevel}>{header}</Text>
      <Text>{subtitle}</Text>
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
      <FillButton {...primaryButton} />
      <StrokeButton {...secondaryButton} />
    </FloatingCard>
  );
};
