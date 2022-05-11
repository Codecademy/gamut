import { configure } from '@testing-library/dom';

import { itHandlesStandardFieldTests } from '../../__fixtures__/assertions';

configure({ testIdAttribute: 'id' });

describe('GridFormTextArea', () => {
  itHandlesStandardFieldTests('GridFormTextArea', 'textbox');
});
