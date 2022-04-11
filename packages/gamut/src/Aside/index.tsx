import { GamutIconProps } from '@codecademy/gamut-icons';
import { StyleProps } from '@codecademy/variance';
import React from 'react';

import { ButtonProps, FillButton, StrokeButton } from '../Button';
import {
  FloatingCardProps,
  floatingCardSystemProps,
} from '../FloatingCard/FloatingCard';
import { List, ListCol, ListRow } from '../List';
import { Text } from '../Typography';
import { AsideContainer } from './elements';

interface AsideListItemProps {
  /** Gamut icon component */
  icon: React.ComponentType<GamutIconProps>;
  /** Text for list item */
  itemText: string;
  /** Each item needs to have a unique ID */
  id: string;
}
interface AsideButtonProps extends Pick<ButtonProps, 'href' | 'onClick'> {
  children: React.ReactNode;
}
export interface AsideProps
  extends Pick<FloatingCardProps, 'pattern'>,
    StyleProps<typeof floatingCardSystemProps> {
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
    <AsideContainer as="aside" pattern={pattern} {...rest}>
      <Text as={headerLevel} gridArea="header">
        {header}
      </Text>
      <Text gridArea="subtitle" mt={8} mb={48}>
        {subtitle}
      </Text>
      <List variant="plain">
        {listItems.map(({ icon: Icon, itemText, id }) => (
          <ListRow key={id}>
            <ListCol>
              <Icon size={24} />
            </ListCol>
            <ListCol size="lg" fill>
              {itemText}
            </ListCol>
          </ListRow>
        ))}
      </List>
      <FillButton gridArea="primaryButton" mt={48} mr={16} {...primaryButton} />
      <StrokeButton gridArea="secondaryButton" ml={4} {...secondaryButton} />
    </AsideContainer>
  );
};
