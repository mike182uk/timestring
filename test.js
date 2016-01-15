var chai = require('chai');
var expect = chai.expect;

var timestring = require('./index');

describe('timestring', function() {
  it('can parse a timestring', function() {
    expect(timestring('1s')).to.equal(1);
    expect(timestring('1m')).to.equal(60);
    expect(timestring('1h')).to.equal(3600);
    expect(timestring('1d')).to.equal(86400);
    expect(timestring('1w')).to.equal(604800);
    expect(timestring('1mth')).to.equal(2419200);
    expect(timestring('1y')).to.equal(29030400);
  });

  it('can return a value in a specified unit', function() {
    expect(timestring('5m', 's')).to.equal(300);
    expect(timestring('5m', 'm')).to.equal(5);
  });

  it('uses the passed options instead of the defaults', function() {
    var opts = {
      hoursPerDay: 1,
      daysPerWeek: 2,
      weeksPerMonth: 3,
      monthsPerYear: 4
    };

    expect(timestring('1d', 'h', opts)).to.equal(1);
    expect(timestring('1w', 'd', opts)).to.equal(2);
    expect(timestring('1mth', 'w', opts)).to.equal(3);
    expect(timestring('1y', 'mth', opts)).to.equal(4);
  });

  it('throws an error when an invalid unit is used in the timestring', function() {
    expect(function() { timestring('1g'); }).to.throw(Error);
  });

  it('can parse a messy time string', function() {
    expect(timestring('5   D a YS    4 h   2 0     mI  nS')).to.equal(447600);
  });
});
