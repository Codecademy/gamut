import { Badge, FlexBox, HiddenText, Text } from '@codecademy/gamut';
import { CloseCircleIcon, MiniCheckCircleIcon } from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React from 'react';

interface PlanFeatureProps {
  feature: string;
  available: boolean;
  isNew?: boolean;
}

const ListItem = styled(FlexBox)`
  list-style-type: none;
`.withComponent('li');

const UnavailableFeature = styled(Text.withComponent('s'))``;

export const PlanFeature: React.FC<PlanFeatureProps> = ({
  feature,
  available,
  isNew,
}) => {
  const Icon = available ? MiniCheckCircleIcon : CloseCircleIcon;

  return (
    <ListItem key={feature} alignItems="center" mt={4}>
      <Icon
        mr={8}
        flexShrink={0}
        color={available ? 'green' : 'text-secondary'}
        aria-hidden
      />

      <FlexBox
        flexWrap={{ _: 'nowrap', md: 'wrap', lg: 'nowrap' }}
        alignItems="baseline"
      >
        {available ? (
          <>
            <HiddenText>Included: </HiddenText>
            <Text width="100%">{feature}</Text>
          </>
        ) : (
          <>
            <UnavailableFeature color="text-secondary">
              <HiddenText>Not included: </HiddenText>
              {feature}
            </UnavailableFeature>
          </>
        )}

        {isNew && (
          <Badge size="sm" variant="yellow" ml={{ _: 4, md: 0, lg: 4 }}>
            New
          </Badge>
        )}
      </FlexBox>
    </ListItem>
  );
};
