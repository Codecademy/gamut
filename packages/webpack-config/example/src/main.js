/* eslint-disable */

import $ from 'jquery';
import styles from './styles';
console.log('hello world');

class MyClass {
  myProp = true;
  constructor() {
    console.log(this.myProp);
  }
}

const c = new MyClass();

console.log(c);
