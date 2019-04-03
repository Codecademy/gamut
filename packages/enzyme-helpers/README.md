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
import { EnzymeHelpers } from '@codecademy/enzyme-helpers';
import MyComponent from 'components/MyComponent';

const { expectCount, setup } = new EnzymeHelpers(
  MyComponent,
  { render: shallow },
  { baseProp: 'a-base-prop' },
);

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
import { EnzymeHelpers, mockStore } from '@codecademy/enzyme-helpers';
import MyConnectedComponent from 'components/MyConnectedComponent';

// mock redux store data 
const storeData = {
  storeKey: 'storeValue',
};

const { setup } = new EnzymeHelpers(
  MyConnectedComponent,
  { render: shallow },
  { store: mockStore(storeData) },
);

describe('MyConnectedComponent', () => {
  test('it receives store data', () => {
    const { wrapper } = setup();

    expect(wrapper.props().storeKey).toEqual('storeValue');
  });
})
```

## Configuration
`EnzymeHelpers` takes three parameters:
```
new EnzymeHelpers(Component, options, baseProps = {});
```

| Name | Type | Required? | Description|
| - | - | - | - |
| Component | `ReactComponent` | Yes | The component to render and test
| options | `object` | | An object containing configuration options
| options.render | `function` | Yes | One of Enzyme's three render methods: `shallow`, `render`, `mount`
| baseProps | `object` | No | Props passed to every component created by `setup()`

## API 
Functions returned from `EnzymeHelpers`:
```
const { expectCount, setup, ...other functions } = new EnzymeHelpers(Component, options, baseProps);
```
| Function | Description |
| - | - |
| `setup()` | Render a react component and expect it exists. `setup()` returns an object containing the enzyme `wrapper` for additional expectations |
| `debug()` | Print the `wrapper` contents to the console |
| `click(selector)` | Simulate a click on the specified selector |
| `clickTestId(testId)` | Simulate a click on the specified test id |
| `expectCount(selector, count = 1)` | Expect a number of the specified selector |
| `expectTestIdCount(testId, count = 1)` | Expect a number of the specified test id |
| `expectAllTestIds(ids)` | Expect an array of test ids |

### A Note on Test Ids
`EnzymeHelpers` expects test ids like so (note, you only need to pass the value to test id functions):
```
<div data-testid="my-test-id" />

expectTestId(div, 'my-test-id') // true
```

## Development
```
yarn link
yarn development

# in your project's repo
yarn link @codecademy/enzyme-helpers
```