import { setupRtl } from '@codecademy/gamut-tests';

import { Header } from '../index';

const testText = 'test text';
const renderView = (props = {}) =>
  setupRtl(Header, {
    text: testText,
    ...props,
  })();

describe('Header', () => {
  it('loads', () => {
    const { view } = renderView();
    view.getByText(testText);
  });
});
