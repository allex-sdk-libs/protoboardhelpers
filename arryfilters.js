function removeNonVals (item) {
  return !keepNonVals(item);
}

function keepNulls(item) {
  return (item === null);
}

function removeNulls (item) {
  return !keepNulls(item);
}

function keepNonVals (item) {
  return (item === null || 'undefined' === typeof(item));
}


module.exports = {
  keepNulls : keepNulls,
  keepNonVals : keepNonVals,
  removeNonVals : removeNonVals,
  removeNulls : removeNulls
};

