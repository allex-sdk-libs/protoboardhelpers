function createProtoboardHelpers (Lib) {
  'use strict';
  var Node = require('allex_nodehelpersserverruntimelib')(Lib);
  return {
    webapp : require('./webapp')(Lib, Node),
    component:require('./component')(Lib, Node)
  }
}

module.exports = createProtoboardHelpers;

