import { Disclosure, List } from '@codecademy/gamut';

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
