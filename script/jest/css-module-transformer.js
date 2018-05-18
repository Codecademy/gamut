module.exports = {
  process() {
    return `
      const idObj = require('identity-obj-proxy');
      module.exports = idObj;
    `;
  },
};
