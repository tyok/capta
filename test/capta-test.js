var cap = require('./../');

var Q = require('q');
var when = require('when');
var RSVP = require('rsvp');
var Bluebird = require('bluebird');

var sinon = require('sinon');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var chaiSinon = require('sinon-chai');

var expect = chai.expect;
chai.use(chaiAsPromised);
chai.use(chaiSinon);

function promises(resolver) {
    return [
      Q.Promise(resolver),
      when.promise(resolver),
      new Bluebird(resolver),
      new RSVP.Promise(resolver)
    ];
}

function stubConsoleLog(onSuccess, onError) {
  var consoleLog = console.log;
  return function stubbedConsoleLog() {
    var arg = ''+arguments[0];
    if (arg.match(/Promise.*captured/)) {
      onSuccess();
    } else if (arg.match(/Promise.*error/)) {
      onError();
    } else {
      consoleLog.apply(null, arguments);
    }
  }
}

describe('capta', function() {
  var successLogCounter, errorLogCounter;
  var consoleLog = console.log;

  before(function() {
    console.log = stubConsoleLog(function() {
      successLogCounter += 1;
    }, function() {
      errorLogCounter += 1;
    });
  });

  after(function() {
    console.log = consoleLog;
  });

  beforeEach(function() {
    successLogCounter = errorLogCounter = 0;
  });

  describe('.spread', function() {
    it('captures promise result', function() {
      var allPromises = promises(function(resolve) { resolve('hello') });

      var results = allPromises.map(cap.spread);

      Bluebird.all(allPromises).then(function() {
        results.forEach(function(r) {
          expect(r._).to.deep.eq(['hello']);
        });
      });
    });

  });

  it('captures promise result', function() {
    var allPromises = promises(function(resolve) { resolve('hello') });

    var results = allPromises.map(cap);

    Bluebird.all(allPromises).then(function() {
      results.forEach(function(r) {
        expect(r._).to.eq('hello');
      });
    });
  });

  it('captures promise error', function() {
    var allPromises = promises(function(_, reject) { reject('an error!') });

    var results = allPromises.map(cap);

    Bluebird.any(allPromises).then(null, function() {
      results.forEach(function(r) {
        expect(r.err).to.eq('an error!');
      });
    });
  });

  it('logs on success', function() {
    var allPromises = promises(function(resolve) { resolve('hello') });

    var results = allPromises.map(cap);

    Bluebird.all(allPromises).then(function() {
      expect(successLogCounter).to.eq(4);
    });
  });

  it('logs on error', function() {
    var allPromises = promises(function(_, reject) { reject('an error!') });

    var results = allPromises.map(cap);

    Bluebird.any(allPromises).then(null, function() {
      expect(errorLogCounter).to.eq(4);
    });
  });
});

