<img src="https://i.imgsafe.org/b8022bf.png" alt="Drawing" width="500"/>

***

Fluxile is a set of mixins (and more, eventually) that enhance the Reflux flux library (though it could potentially be used with a different flux implementation);

### Installing:
```shell
npm install @codecademy/fluxile --save
```

***

### `Statemixin.store`
```js
import { createStore } from 'reflux';
import { StateMixin } from 'fluxile';

export const MyStore = createStore({
  mixins: [StateMixin.store],

  getInitialState() {
   return {
     items: [
      {
        title: 'First Item',
        body: 'Lorem ipsum'
      }
     ],
     currentItemIndex: 0
   }
  }
});

```

***

### `StateMixin.connect`


Listen to a single key on a store:

```js
import React, { createClass } from 'react';
import { StateMixin } from 'fluxile';
import MyStore from './store/MyStore';

export const MyComponent = createClass({
  mixins: [StateMixin.connect(MyStore, 'items')],

  render() {
    return (
      <div>
        {this.state.items.map((itm) => <div>{item.title}</div>)}
      </div>
    )
  }

});
```

Listen to multiple keys on a store:

```js
import React, { createClass } from 'react';
import { StateMixin } from 'fluxile';
import MyStore from './store/MyStore';

export const MyComponent = createClass({
  mixins: [StateMixin.connect(MyStore, ['items', 'currentItemIndex'])],

  render() {
    return (
      <div>
        {
          this.state.items.map((itm, i) => {
            <div className={(i === this.state.currentItemIndex) 'current' : ''}>
              {item.title}
            </div>
          });
        }
      </div>
    )
  }

});

```

### `connect (as function)`

```js
import React, { Component, PropTypes} from 'react';
import { connect } from 'fluxile';
import MyStore from './store/MyStore';

class MyComponent extends Component {

  static propTypes = {
    items: PropTypes.array
  };

  render() {
    return (
      <div>
        {this.props.items.map((itm) => <div>{item.title}</div>)}
      </div>
    )
  }

};

export default connect(MyStore, ['items'])(MyComponent)
```

### `connect (as es7 decorator)`

```js
import React, { Component, PropTypes} from 'react';
import { connect } from 'fluxile';
import MyStore from './store/MyStore';

@connect(MyStore, ['items'])
class MyComponent extends Component {

  static propTypes = {
    items: PropTypes.array
  };

  render() {
    return (
      <div>
        {this.props.items.map((itm) => <div>{item.title}</div>)}
      </div>
    )
  }

};

export default MyComponent;
```

### `connect (as function with multiple stores)`

```js
import React, { Component, PropTypes} from 'react';
import { connect, compose } from 'fluxile';
import MyStore from './store/MyStore';
import MyOtherStore from './store/MyStore';

class MyComponent extends Component {

  static propTypes = {
    items: PropTypes.array
  };

  render() {
    return (
      <div>
        {this.props.items.map((itm) => <div>{item.title}</div>)}
      </div>
    )
  }

};

export default connect(MyStore, ['items'])(MyComponent)
```


***

[![Circle CI](https://circleci.com/gh/RyzacInc/fluxile.svg?style=svg&circle-token=70e60317027db15b6ce10f590ed7db5612ccfb25)](https://circleci.com/gh/RyzacInc/fluxile)
