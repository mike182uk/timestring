var chai = require('chai');
var expect = chai.expect;
var timestring = require('../timestring');

describe('timestring', function() {
  it('can parse a timestring', function(done) {
    var ts = new timestring();

    expect(ts.parse('1s')).to.equal(1);
    expect(ts.parse('1m')).to.equal(60);
    expect(ts.parse('1h')).to.equal(3600);
    expect(ts.parse('1d')).to.equal(86400);
    expect(ts.parse('1w')).to.equal(604800);
    expect(ts.parse('1mth')).to.equal(2419200);
    expect(ts.parse('1y')).to.equal(29030400);

    done();
  });

  it('can return a value in a specified unit', function(done) {
    expect((new timestring()).parse('5m', 's')).to.equal(300);
    expect((new timestring()).parse('5m', 'm')).to.equal(5);

    done();
  });

  it('uses the passed settings instead of the defaults', function(done) {
    var settings = {
      hoursPerDay: 1,
      daysPerWeek: 2,
      weeksPerMonth: 3,
      monthsPerYear: 4
    };

    var ts = new timestring(settings);

    expect(ts.parse('1d', 'h')).to.equal(1);
    expect(ts.parse('1w', 'd')).to.equal(2);
    expect(ts.parse('1mth', 'w')).to.equal(3);
    expect(ts.parse('1y', 'mth')).to.equal(4);


    done();
  });

  it('throws an error when an invalid unit is used in the timestring', function(done) {
    var ts = new timestring();

    expect(ts.parse.bind(ts, '1g')).to.throw(Error);

    done();
  });

  it('can parse a messy time string', function(done) {
    expect((new timestring()).parse('5   D a YS    4 h   2 0     mI  nS')).to.equal(447600);

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
