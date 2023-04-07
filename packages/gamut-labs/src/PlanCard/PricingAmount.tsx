import { FlexBox, HiddenText, Text } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Currency, getCurrencySymbol, PlanType } from './types';

const Amount = styled(Text)`
  font-weight: bold;
  color: black;
  font-size: 44px;
  line-height: 64px;
  ${theme.breakpoints.xl} {
    font-size: 64px;
    line-height: 80px;
  }
`;

interface PricingAmountProps {
  product: PlanType;
  price: string;
  monthlyPrice?: string;
  currency: Currency;
  termMonths?: number;
  compact?: boolean;
}

export const PricingAmount: React.FC<PricingAmountProps> = ({
  currency,
  monthlyPrice,
  product,
  price,
  termMonths,
  compact = false,
}) => {
  const cycle = termMonths === 1 ? 'monthly' : 'annually';
  const [dollars, cents] = price.split('.');
  let ariaLabel = `${getCurrencySymbol(currency)}${dollars}${
    cents ? `.${cents}` : ''
  }`;
  if (product !== 'basic') {
    ariaLabel += ` a month, billed ${cycle}`;
    if (monthlyPrice) {
      ariaLabel += ` or ${getCurrencySymbol(
        currency
      )}${monthlyPrice} billed monthly`;
    }
  }

  return (
    <>
      <FlexBox
        data-testid="pricing-amount"
        lineHeight="title"
        mb={compact ? 0 : 8}
        column
        alignItems="center"
      >
        <HiddenText data-testid="pricing-amount-label">{ariaLabel}</HiddenText>
        {/* for screen reader optimization */}
        <FlexBox
          aria-hidden
          row
          alignItems="center"
          height={{ _: 50, xl: 'unset' }}
        >
          <FlexBox mr={4} alignItems="start">
            <Text
              mt={{ _: 12, xl: 16 }}
              fontWeight="bold"
              fontSize={34}
            >{`${getCurrencySymbol(currency)}`}</Text>
            <Amount>{`${dollars}`}</Amount>
            {product === 'basic' ? null : (
              <FlexBox column alignItems="flex-end" ml={4}>
                <Text fontWeight="bold" fontSize={22} mt={{ _: 12, xl: 16 }}>
                  {cents ? `.${cents}` : <span>&nbsp;</span>}
                </Text>
                <Text mt={{ _: 0, xl: 4 }} color="navy-500">
                  /mo
                </Text>
              </FlexBox>
            )}
          </FlexBox>
        </FlexBox>
        <Text color="navy-500" center mt={compact ? 0 : { _: 8, xl: 0 }}>
          {product === 'basic' ? (
            <Text mb={24}>Always free</Text>
          ) : (
            <>
              <Text mb={compact ? 0 : 8} aria-hidden>
                {`Billed ${cycle}`}
              </Text>
              <br />
              {monthlyPrice && (
                <Text aria-hidden>
                  {`or ${getCurrencySymbol(
                    currency
                  )}${monthlyPrice} billed monthly`}
                </Text>
              )}
            </>
          )}
        </Text>
      </FlexBox>
    </>
  );
};
