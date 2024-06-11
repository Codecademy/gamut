import { Anchor, Box, Column, IconComponentType,LayoutGrid, Text } from "@codecademy/gamut";
import { Background } from "@codecademy/gamut-styles";
import startCase from 'lodash/startCase';


const variants = ['inline', 'interface', 'standard'] as const;

export const VariantsExample = (icon: IconComponentType) => (
  <LayoutGrid>
    <Column size={6}>
      <Background
        p={32}
        bg="white"
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
      >
        {variants.map((variant) => (
          <Box key={`${variant}-light`}>
            <Text as="p" fontWeight="title">
              {startCase(variant)}
            </Text>
            {icon ?? <Anchor mr={8} variant={variant} href={`#${variant}`} icon={icon}>
              Click Me
            </Anchor>}
          </Box>
        ))}
      </Background>
    </Column>
    <Column size={6}>
      <Background
        p={32}
        bg="navy"
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
      >
        {variants.map((variant) => (
          <Box key={`${variant}-dark`}>
            <Text as="p" fontWeight="title">
              {startCase(variant)}
            </Text>{' '}
            {icon ?? <Anchor mr={8} variant={variant} href={`#${variant}`} icon={icon}>
              Click Me
            </Anchor>}
          </Box>
        ))}
      </Background>
    </Column>
  </LayoutGrid>
)
