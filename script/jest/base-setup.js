/**
 * This file is included before each test to configure the test environment.
 */

require('babel-polyfill');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

// make window.location.assign modify the jsdom url
const shimLocationAssign = require('./helpers/shimLocationAssign');

shimLocationAssign();
