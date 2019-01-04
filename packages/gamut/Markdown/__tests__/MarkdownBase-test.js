import React from 'react';
import { MarkdownBase } from 'components/Markdown';

import { shallow } from 'enzyme';

it('renders the Markdown when specified', () => {
  const rawMarkdown =
    "# Creep\n\nThe twenty second of loneliness\n\nAnd we've been through so many things";
  const markdown = shallow(<MarkdownBase text={rawMarkdown} />);
  expect(markdown).toMatchSnapshot();
});
