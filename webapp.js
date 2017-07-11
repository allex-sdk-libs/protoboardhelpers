var Filters = require('./arryfilters');

function createWebAppHelpers (Lib, Node) {
  'use strict';
  var Fs = Node.Fs,
    Path = Node.Path;

  function checkIsWebApp (root, name) {
    try {
      Fs.readFieldFromJSONFile(Path.resolve(root, name, 'protoboard.json'), 'protoboard.role');
    }catch (ignore) {
      return null;
    }
    return name;
  }

  function find(path) {
    if (!path) path = process.cwd();
    path = Path.resolve(path);

    var dirs = Fs.readdirSync(path);
    return dirs.map(checkIsWebApp.bind(null, path)).filter(Filters.removeNonVals);
  }

  function isWebapp (path) {
    return checkIsWebApp(path, './') ? true : false;
  }

  return {
    find : find,
    isWebapp: isWebapp
  };
}

module.exports = createWebAppHelpers;

