/* globals describe, it */

var chai = require('chai')
var expect = chai.expect

var timestring = require('./index')

describe('timestring', function () {
  it('can parse a timestring', function () {
    expect(timestring('500ms')).to.equal(0.5)
    expect(timestring('1s')).to.equal(1)
    expect(timestring('1m')).to.equal(60)
    expect(timestring('1h')).to.equal(3600)
    expect(timestring('1d')).to.equal(86400)
    expect(timestring('1w')).to.equal(604800)
    expect(timestring('1mth')).to.equal(2419200)
    expect(timestring('1y')).to.equal(29030400)
  })

  it('can parse different unit identifiers', function () {
    var unitMap = {
      ms: ['ms', 'milli', 'millisecond', 'milliseconds'],
      s: ['s', 'sec', 'secs', 'second', 'seconds'],
      m: ['m', 'min', 'mins', 'minute', 'minutes'],
      h: ['h', 'hr', 'hrs', 'hour', 'hours'],
      d: ['d', 'day', 'days'],
      w: ['w', 'week', 'weeks'],
      mth: ['mon', 'mth', 'mths', 'month', 'months'],
      y: ['y', 'yr', 'yrs', 'year', 'years']
    }

    unitMap.ms.forEach(function (msUnit) {
      expect(timestring('500 ' + msUnit)).to.equal(0.5)
    })

    unitMap.s.forEach(function (sUnit) {
      expect(timestring('3 ' + sUnit)).to.equal(3)
    })

    unitMap.m.forEach(function (mUnit) {
      expect(timestring('2 ' + mUnit)).to.equal(120)
    })

    unitMap.h.forEach(function (hUnit) {
      expect(timestring('7 ' + hUnit)).to.equal(25200)
    })

    unitMap.d.forEach(function (dUnit) {
      expect(timestring('4 ' + dUnit)).to.equal(345600)
    })

    unitMap.w.forEach(function (wUnit) {
      expect(timestring('2 ' + wUnit)).to.equal(1209600)
    })

    unitMap.mth.forEach(function (mthUnit) {
      expect(timestring('9 ' + mthUnit)).to.equal(21772800)
    })

    unitMap.y.forEach(function (yUnit) {
      expect(timestring('1 ' + yUnit)).to.equal(29030400)
    })
  })

  it('can return a value in a specified unit', function () {
    expect(timestring('1m', 'ms')).to.equal(60000)
    expect(timestring('5m', 's')).to.equal(300)
    expect(timestring('5m', 'm')).to.equal(5)
  })

  it('uses the passed options instead of the defaults', function () {
    var opts = {
      hoursPerDay: 1,
      daysPerWeek: 2,
      weeksPerMonth: 3,
      monthsPerYear: 4
    }

    expect(timestring('1d', 'h', opts)).to.equal(1)
    expect(timestring('1w', 'd', opts)).to.equal(2)
    expect(timestring('1mth', 'w', opts)).to.equal(3)
    expect(timestring('1y', 'mth', opts)).to.equal(4)
  })

  it('throws an error when an invalid unit is used in the timestring', function () {
    expect(function () { timestring('1g') }).to.throw(Error)
  })

  it('can parse a messy time string', function () {
    expect(timestring('5   D a YS    4 h   2 0     mI  nS')).to.equal(447600)
  })
})
