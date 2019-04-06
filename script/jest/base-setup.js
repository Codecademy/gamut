/**
 * This file is included before each test to configure the test environment.
 */

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const registerRequireContextHook = require('babel-plugin-require-context-hook/register');

Enzyme.configure({ adapter: new Adapter() });
registerRequireContextHook();

// Set fixed date
Date.now = jest.fn(() => new Date(Date.UTC(2019, 3, 24)).valueOf());
