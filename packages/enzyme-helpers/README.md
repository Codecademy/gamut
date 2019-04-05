# Enzyme Helpers

Collection of Enzyme helpers for actions and expectations. 

## Installation
```
yarn add -D @codecademy/enzyme-helpers
```
`enzyme-helpers` requires `react`, `react-dom`, `enzyme`, and `enzyme-adapter-react-16` as peer dependencies

## Usage
```
import { shallow } from 'enzyme';
import { createEnzymeHelpers } from '@codecademy/enzyme-helpers';
import MyComponent from 'components/MyComponent';

const { expectCount, setup } = createEnzymeHelpers({
  Component: MyComponent,
  render: shallow,
  baseProps: { baseProp: 'a-base-prop' },
});

describe('MyComponent', () => {
  test('it renders the component', () => {
    // calling setup() automatically fires expectations that the component exists and renders
    const { wrapper } = setup({ prop: 'a-prop' });

    // use functions returned by the class constructor for common expectations
    expectCount(button, 1);

    // setup() returns a wrapper for additional expectations
    expect(wrapper.props().prop).toEqual('a-prop');

    // props passed to the class constructor are passed to every setup() call
    expect(wrapper.props().baseProp).toEqual('a-base-prop');
  });
});
```

## Usage with Redux
```
import { shallow } from 'enzyme';
import { createEnzymeHelpers, mockStore } from '@codecademy/enzyme-helpers';
import MyConnectedComponent from 'components/MyConnectedComponent';

// mock redux store data 
const storeData = {
  storeKey: 'storeValue',
};

const { setup } = createEnzymeHelpers({
  Component: MyConnectedComponent,
  render: shallow,
  baseProps: { store: mockStore(storeData) },
});

describe('MyConnectedComponent', () => {
  test('it receives store data', () => {
    const { wrapper } = setup();

    expect(wrapper.props().storeKey).toEqual('storeValue');
  });
})
```

## Configuration
`createEnzymeHelpers` takes an object of options
```
createEnzymeHelpers({ Component, render, baseProps = {} });
```

| Name | Type | Required? | Description|
| - | - | - | - |
| Component | `ReactComponent` | Yes | The component to render and test
| render | `function` | Yes | One of Enzyme's three render methods: `shallow`, `render`, `mount`
| baseProps | `object` | No | Props passed to every component created by `setup()`

## API 
Functions returned from `createEnzymeHelpers`. See `test/main.test.js` for example usage.
```
const {
  expectCount,
  setup,
  ...other functions
} = createEnzymeHelpers({ Component, render, baseProps });
```
| Function | Description |
| - | - |
| `setup()` | Render a react component and expect it exists. `setup()` returns an object containing the enzyme `wrapper` for additional expectations |
| `debug()` | Print the `wrapper` contents to the console |
| `click(selector)` | Simulate a click on the specified selector |
| `clickTestId(testId)` | Simulate a click on the specified test id |
| `expectCount(selector, count = 1)` | Expect a number of the specified selector |
| `expectTestId(testId)` | Expect that a given test id exists in the wrapper |	
| `expectTestIdCount(testId, count = 1)` | Expect a number of the specified test id |
| `expectAllTestIds(ids)` | Expect an array of test ids |

### A Note on Test Ids
`enzyme-helpers` expects test ids like so (note, you only need to pass the value to test id functions):
```
<div data-testid="my-test-id" />

expectTestId(div, 'my-test-id') // true
```

## Development
```
yarn link
yarn develop

# in your project's repo
yarn link @codecademy/enzyme-helpers
```