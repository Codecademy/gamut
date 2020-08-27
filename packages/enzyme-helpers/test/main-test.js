import { shallow } from 'enzyme';
import { createEnzymeHelpers } from '../src/main';
import { TestComponent } from './TestComponent';

describe('Enzyme Helpers', () => {
  describe('Base Functionality', () => {
    const onClick = jest.fn();
    const {
      click,
      clickTestId,
      debug,
      expectAllTestIds,
      expectCount,
      expectTestId,
      expectTestIdCount,
      setup,
    } = createEnzymeHelpers({
      Component: TestComponent,
      render: shallow,
      baseProps: { baseProp: 'this is a base prop', onClick },
    });

    test('It creates a component with props', () => {
      const { wrapper } = setup({ componentProp: 'this is a component prop' });

      expect(wrapper).toHaveProp('baseProp', 'this is a base prop');
      expect(wrapper).toHaveProp('componentProp', 'this is a component prop');
    });

    test('debug()', () => {
      jest.spyOn(global.console, 'log');
      setup();
      debug();

      expect(global.console.log).toBeCalledTimes(1);
    });

    describe('Click functions', () => {
      test('click()', () => {
        setup();
        click('button');

        expect(onClick).toBeCalled();
      });

      test('clickTestId()', () => {
        setup();
        clickTestId('button');

        expect(onClick).toBeCalled();
      });
    });

    describe('Expectations', () => {
      test('expectCount()', () => {
        setup();

        expectCount('div', 1);
      });

      test('expectTestId()', () => {
        setup();

        expectTestId('container');
      });

      test('expectTestIdCount()', () => {
        setup();

        expectTestIdCount('container', 1);
      });

      test('expectAllTestIds()', () => {
        setup();

        expectAllTestIds(['container', 'button']);
      });
    });
  });

  describe('Empty Render', () => {
    const { setup } = createEnzymeHelpers({
      Component: () => null,
      render: shallow,
    });

    test('It fails on empty components', () => {
      expect(() => setup()).toThrow();
    });
  });
});
