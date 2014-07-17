var chai = require('chai');
var expect = chai.expect;
var timestring = require('../timestring');

describe('timestring', function() {
  it('should expose a method on String.prototype that will attempt to parse the string as a timestring', function(done){
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
