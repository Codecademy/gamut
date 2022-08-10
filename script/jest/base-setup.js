// Set fixed date
Date.now = jest.fn(() => new Date(2011, 6, 1).valueOf());

require('mutationobserver-shim');
