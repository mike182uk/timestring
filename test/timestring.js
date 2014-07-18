var chai = require('chai');
var expect = chai.expect;
var timestring = require('../timestring');

describe('timestring', function() {
  it('throws an error when an invalid unit is used in the timestring', function(done) {
    var ts = new timestring();

    expect(ts.parse.bind(ts, '1g')).to.throw(Error);

    done();
  });

  it('should expose a method on String.prototype that will parse the string as a timestring', function(done){
    var str = '1min';

    // no arguments passed
    expect(str.parseTime()).to.equal(60);

    // units argument passed
    expect(str.parseTime('m')).to.equal(1);

    // units + settings argument passed
    str = '5h';
    expect(str.parseTime('d', { hoursPerDay: 5 })).to.equal(1);

    done();
  });
});
