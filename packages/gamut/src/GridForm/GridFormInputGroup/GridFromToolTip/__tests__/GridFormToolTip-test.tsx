import { renderGridFormToolTip } from '../../__fixtures__/renderers';

describe('GridFormToolTip', () => {
  describe('when an id is passed as a prop', () => {
    it('renders a select with the same id', () => {
      const tooltip = renderGridFormToolTip({ id: 'mycoolid' });

      expect(tooltip.find('div#mycoolid').length).toBe(1);
    });
  });
});
