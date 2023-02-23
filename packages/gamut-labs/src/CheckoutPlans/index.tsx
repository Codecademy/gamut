import {
  Badge,
  Box,
  Card,
  FlexBox,
  GridBox,
  List,
  Radio,
  Text,
} from '@codecademy/gamut';
import {
  DiagonalADense,
  DiagonalARegular,
  DotDense,
} from '@codecademy/gamut-patterns';
import { css, states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { PlanFeature } from './PlanFeature';
import { PricingAmount } from './PricingAmount';
import { RecommendedBadge } from './RecommendedBadge';
import { BillingSubscription, Currency, PaymentPlan, PlanType } from './types';

const PricingBox = styled(FlexBox)(
  css({
    alignItems: 'flex-start',
    bg: 'white',
    position: 'relative',
    px: { _: 24, sm: 48 },
    justifyContent: 'center',
    py: 4,
    minWidth: 100,
  }),
  states({
    hasLongPrice: {
      px: {
        _: 24,
        sm: 24,
      },
    },
  })
);

const StyledRadio = styled(Radio)`
  pointer-events: none; // prevents the radio button from blocking clicks on the <label>
  width: auto;

  input + label {
    padding: 0;
  }
`;

const Label = styled(Text)`
  cursor: pointer;

  // this allows the label click area to take up the entire grid item while only containing the plan name
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
`.withComponent('label');

interface Plan {
  price: number;
  id: string;
  title: string;
  tag: string;
  isLite: boolean;
  features: Record<string, boolean>;
  newFeatures?: Record<string, boolean> | undefined;
}

export interface PlanCardProps {
  // upgradePlanOptions?: PaymentPlan[];
  // subscription: BillingSubscription;
  // selectedPlan: PaymentPlan;
  // setSelectedPlan: React.Dispatch<React.SetStateAction<Plan | undefined>>;
  // ariaLabelledBy: string;
  // plans: Plan[];
  isSelected: boolean;
  hasLongPrice: boolean;
  accentColor: 'yellow' | 'paleYellow';
  price: string;
  currency: Currency;
  plan: Plan;
  termMonths: number;
  onChange: (thing: any) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  // upgradePlanOptions,
  // subscription,
  // selectedPlan,
  // setSelectedPlan,
  // ariaLabelledBy,
  // plans,
  isSelected,
  hasLongPrice,
  accentColor,
  // planType, // planDetails id
  price,
  currency,
  plan,
  termMonths,
  onChange,
}) => {
  // plan.id = 'pro-silver', etc.

  return (
    <Card key={plan.id} shadow="medium" p={0} borderWidth={isSelected ? 2 : 1}>
      <FlexBox
        flexDirection={{
          _: 'column',
          xs: 'row',
          md: 'column',
          lg: 'row',
        }}
        alignItems={{
          _: 'flex-start',
          lg: 'center',
        }}
        justifyContent="space-between"
        px={16}
        py={12}
        borderBottom={isSelected ? 2 : 1}
        bg={isSelected ? accentColor : undefined}
      >
        <FlexBox alignItems="center" whiteSpace="nowrap">
          <StyledRadio
            name="planId"
            htmlFor="radio"
            id={plan.id}
            value={plan.id}
            checked={isSelected}
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
          <Label variant="title-xs" ml={8} htmlFor={`radio-${plan.id}`}>
            {plan.title}
          </Label>
        </FlexBox>
        <Badge variant="strokeContrast" ml={{ _: 32, xs: 0, md: 32 }}>
          {plan.tag}
        </Badge>
      </FlexBox>
      <FlexBox
        position="relative"
        alignItems="center"
        justifyContent="center"
        p={24}
        color="yellow"
      >
        {isSelected && (
          <DiagonalARegular
            position="absolute"
            left={0}
            top={0}
            width="100%"
            height="100%"
          />
        )}

        <Box color="navy" position="relative">
          {isSelected && (
            <Box
              position="absolute"
              top={4}
              right={4}
              color="yellow"
              width="100%"
              height="100%"
              bg="white"
              overflow="hidden"
            >
              <DiagonalADense />
            </Box>
          )}
          {price && (
            <PricingBox hasLongPrice={hasLongPrice}>
              <PricingAmount
                termMonths={termMonths}
                price={price}
                product={plan.id as PlanType}
                currency={currency}
                compact
              />
            </PricingBox>
          )}
        </Box>
      </FlexBox>
      {!isSelected && (
        <Box height="1px" mx={16} overflow="hidden">
          <DotDense height="auto" />
        </Box>
      )}
      <FlexBox justifyContent="center" position="relative" p={24} m={0}>
        {plan.id === 'pro-gold' && <RecommendedBadge top={-14} />}
        {
          <List>
            {Object.entries(plan.features).map(([feature, available]) => (
              <PlanFeature
                feature={feature}
                available={available}
                key={feature}
              />
            ))}
            {/* Features that are coming soon */}
            {plan.newFeatures &&
              Object.entries(plan.newFeatures).map(([feature, available]) => (
                <PlanFeature
                  feature={feature}
                  available={available}
                  isNew={available}
                  key={feature}
                />
              ))}
          </List>
        }
      </FlexBox>
    </Card>
  );
};
