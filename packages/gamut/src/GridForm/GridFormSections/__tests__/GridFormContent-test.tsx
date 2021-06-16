import { setupEnzyme } from '@codecademy/gamut-tests';

import { stubTextField } from '../../__tests__/stubs';
import { GridFormContentTestComponent } from '../__fixtures__/renderers';

const renderWrapper = setupEnzyme(GridFormContentTestComponent, {
  field: stubTextField,
  showRequired: false,
});

describe('<GridFormContent>', () => {
  it('renders the field passed via props', () => {
    const { wrapper } = renderWrapper();
    const field = wrapper.find('input#stub-text');
    expect(field).toBeTruthy;
  });

  it('gives that field access to formContext', () => {
    const { wrapper } = renderWrapper();
    const field = wrapper.find('input#stub-text');
    expect(field).toBeTruthy;
  });
});
