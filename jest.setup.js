import 'whatwg-fetch';
const path = require('path');

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
module.exports = {
  process(src, filename, config, options) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  },
};

jest.mock('global', () => ({
  ...global,
  WebSocket: function WebSocket() {},
}));