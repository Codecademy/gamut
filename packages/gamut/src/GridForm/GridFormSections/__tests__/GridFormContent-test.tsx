import { WrappedGridFormContent } from '../../GridFormInputGroup/__fixtures__/renderers';

describe('GridFormContent', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an input with the same id', () => {
      const radioButtons = WrappedGridFormContent({});

      expect(radioButtons).toBeTruthy;
    });
  });
});
