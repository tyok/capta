module.exports = capta;
module.exports.first = captaFirst;

function capta(promise) {
  var trap = {};

  capture(promise, function(error, result) {
    trap.err = error;
    trap._ = result;
  });

  return trap;
}

function captaFirst(promise) {
  var trap = {};

  capture(promise, function(error, result) {
    trap.err = error;
    trap._ = (result || [])[0];
  });

  return trap;
}

function capture(promise, fn) {
  promise.then(function(result) {

    console.log('Promise captured!');
    var args = Array.prototype.slice.call(arguments, 0);
    fn(null, args);

  }, function(error) {

    console.log('Promise error!');
    fn(error);

  });
}
