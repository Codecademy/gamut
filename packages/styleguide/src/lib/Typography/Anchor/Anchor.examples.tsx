import {
  Anchor,
  AnchorProps,
  Box,
  Column,
  FlexBox,
  LayoutGrid,
  Text,
} from '@codecademy/gamut';
import {
  MiniArrowRightIcon,
  MiniInfoOutlineIcon,
  MiniStarIcon,
} from '@codecademy/gamut-icons';
import { Background } from '@codecademy/gamut-styles';
import startCase from 'lodash/startCase';

const variants = ['inline', 'interface', 'standard'] as const;

export const VariantsExample = ({ useIcon }: { useIcon: boolean }) => {
  return (
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
              <Anchor
                mr={8}
                variant={variant}
                href={`#${variant}`}
                icon={useIcon ? MiniStarIcon : undefined}
              >
                Click Me
              </Anchor>
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
              <Anchor
                mr={8}
                variant={variant}
                href={`#${variant}`}
                icon={useIcon ? MiniStarIcon : undefined}
              >
                Click Me
              </Anchor>
            </Box>
          ))}
        </Background>
      </Column>
    </LayoutGrid>
  );
};

export const InlineAnchorWithIconAndText: React.FC<AnchorProps> = (args) => {
  return (
    <Text fontSize={14}>
      I started painting as a hobby when I was little. I didn&apos;t know I had
      any talent. I believe talent is just a pursued interest.e{' '}
      <Anchor
        {...args}
        href="/"
        icon={MiniInfoOutlineIcon}
        iconPosition="left"
        variant="inline"
      >
        Anybody can do what I do.
      </Anchor>{' '}
      Just go back and put one little more happy tree in there. Everybody&apos;s
      different.{' '}
      <Anchor
        {...args}
        href="/"
        icon={MiniArrowRightIcon}
        iconPosition="right"
        variant="inline"
      >
        Learn more
      </Anchor>
    </Text>
  );
};

export const PolymorphicAnchors: React.FC<AnchorProps> = (args) => {
  return (
    <FlexBox justifyContent="space-around">
      <Anchor {...args} variant="standard" onClick={() => null}>
        I look like an Anchor, but I am a button.
      </Anchor>

      <Anchor {...args} href="/">
        I look like a link, and I am one!
      </Anchor>
    </FlexBox>
  );
};
