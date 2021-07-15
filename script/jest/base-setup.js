/**
 * This file is included before each test to configure the test environment.
 */

const Enzyme = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

Enzyme.configure({ adapter: new Adapter() });

// Set fixed date
Date.now = jest.fn(() => new Date(2011, 6, 1).valueOf());

require('mutationobserver-shim');
