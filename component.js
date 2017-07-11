function createComponentHelpers (Lib, Node) {
  'use strict';

  var AllexQ = Lib.qlib,
    Q = Lib.q;

  function createbuildpromises (path) {
    return Node.executeCommand.bind(Node, 'allex-component-build', null, {cwd: path});
  }

  function failed(paths, rec, index) {
    if (rec.error) {
      Node.error('Component build on path ',paths[index], 'responded with error ', rec);
      return true;
    }
    return false;
  }

  function analyzePromises (d,paths,results) {
    var f = results.filter(failed.bind(null, paths));
    if (f.length) {
      d.reject(new Error('Problems with building components ...'));
    }else{
      d.resolve();
    }
  }

  function build (path) {
    var d = Q.defer();

    if (Lib.isString(path)) {
      path = [path];
    }else if (!Lib.isArray(path)) {
      throw new Error ('Input arg must be a string or array ..');
    }
    AllexQ.chainPromises(path.map(createbuildpromises)).done(analyzePromises.bind(null,d, path));
    return d.promise;
  }

  return {
    build: build
  };
}

module.exports = createComponentHelpers;

