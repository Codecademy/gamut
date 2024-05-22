import { Disclosure, List, Text } from '@codecademy/gamut';

export const ListDisclosureExample = () => {
  return (
    <List>
      <Disclosure
        heading="First"
        initiallyExpanded
        body="First Disclosure expanded"
        ctaText="click here!"
        ctaCallback={() => null}
        buttonPlacement="right"
        href="/"
      />
      <Disclosure
        heading="Second"
        initiallyExpanded
        body="Second Disclosure expanded"
        ctaText="click here!"
        ctaCallback={() => null}
        buttonPlacement="left"
        href="/"
      />
      <Disclosure
        heading="Third"
        initiallyExpanded={false}
        body="Third Disclosure expanded"
        ctaText="click here!"
        ctaCallback={() => null}
        href="/"
      />
    </List>
  );
};

export const ConstrainedText = (
  <Text maxWidth="600px">
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis tempore voluptatum, hic ipsum cum commodi laudantium? Mollitia quod totam consequuntur facere, praesentium cumque nesciunt debitis officiis, ipsa sapiente recusandae iusto.
  </Text>
)

