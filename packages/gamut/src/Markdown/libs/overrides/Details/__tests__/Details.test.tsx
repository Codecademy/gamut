/* eslint-disable jsx-a11y/no-distracting-elements */
import { setupRtl } from '@codecademy/gamut-tests';

import { Markdown } from '../../../..';

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
veniam, quis nostrud exercitation ullamco laboris`;
const renderView = setupRtl(Markdown);
const detailsWithSummary = `
<details>
  <summary>View More</summary>
  ${lorem}
</details>
`;
const detailsWithoutSummary = `
<details>
  ${lorem}
</details>
`;

/**
 * NOTE: These tests are done using the parent markdown component for ease of testing
 * otherwise we'd need to run it through html-to-react manually to get the correct types for `children` etc
 */
describe('Details', () => {
  it('Renders the custom details element by default', () => {
    const { view } = renderView({
      text: detailsWithoutSummary,
    });

    expect(view.getByTestId('gamut-md-details')).toBeInTheDocument();
  });

  it('Renders a default summary when it is not provided', () => {
    const { view } = renderView({
      text: detailsWithoutSummary,
    });

    expect(view.queryAllByText('Details')).toHaveLength(1);
  });

  it('Does not render the default summary when one is already provided', () => {
    const { view } = renderView({
      text: detailsWithSummary,
    });

    expect(view.queryAllByText('Details')).toHaveLength(0);
    expect(view.queryAllByText('View More')).toHaveLength(1);
  });
});
