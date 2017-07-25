'use strict'

/* globals describe, it */

const chai = require('chai')
const timestring = require('./index')

const expect = chai.expect

describe('timestring', () => {
  it('can parse a timestring', () => {
    expect(timestring('500ms')).to.equal(0.5)
    expect(timestring('1s')).to.equal(1)
    expect(timestring('1m')).to.equal(60)
    expect(timestring('1h')).to.equal(3600)
    expect(timestring('1d')).to.equal(86400)
    expect(timestring('1w')).to.equal(604800)
    expect(timestring('1mth')).to.equal(2629800)
    expect(timestring('1y')).to.equal(31557600)
  })

  it('can parse different unit identifiers', () => {
    let unitMap = {
      ms: ['ms', 'milli', 'millisecond', 'milliseconds'],
      s: ['s', 'sec', 'secs', 'second', 'seconds'],
      m: ['m', 'min', 'mins', 'minute', 'minutes'],
      h: ['h', 'hr', 'hrs', 'hour', 'hours'],
      d: ['d', 'day', 'days'],
      w: ['w', 'week', 'weeks'],
      mth: ['mon', 'mth', 'mths', 'month', 'months'],
      y: ['y', 'yr', 'yrs', 'year', 'years']
    }

    unitMap.ms.forEach(unit => {
      expect(timestring(`500 ${unit}`)).to.equal(0.5)
    })

    unitMap.s.forEach(unit => {
      expect(timestring(`3 ${unit}`)).to.equal(3)
    })

    unitMap.m.forEach(unit => {
      expect(timestring(`2 ${unit}`)).to.equal(120)
    })

    unitMap.h.forEach(unit => {
      expect(timestring(`7 ${unit}`)).to.equal(25200)
    })

    unitMap.d.forEach(unit => {
      expect(timestring(`4 ${unit}`)).to.equal(345600)
    })

    unitMap.w.forEach(unit => {
      expect(timestring(`2 ${unit}`)).to.equal(1209600)
    })

    unitMap.mth.forEach(unit => {
      expect(timestring(`9 ${unit}`)).to.equal(23668200)
    })

    unitMap.y.forEach(unit => {
      expect(timestring(`1 ${unit}`)).to.equal(31557600)
    })
  })

  it('can return a value in a specified unit', () => {
    expect(timestring('1m', 'ms')).to.equal(60000)
    expect(timestring('5m', 's')).to.equal(300)
    expect(timestring('5m', 'm')).to.equal(5)
  })

  it('uses the passed options instead of the defaults', () => {
    let opts = {
      hoursPerDay: 1,
      daysPerWeek: 2,
      weeksPerMonth: 3,
      monthsPerYear: 4,
      daysPerYear: 30
    }

    expect(timestring('1d', 'h', opts)).to.equal(1)
    expect(timestring('1w', 'd', opts)).to.equal(2)
    expect(timestring('1mth', 'w', opts)).to.equal(3.75)
    expect(timestring('1y', 'mth', opts)).to.equal(4)
  })

  it('throws an error when an invalid unit is used in the timestring', () => {
    expect(() => timestring('1g')).to.throw(Error)
  })

  it('can parse a messy time string', () => {
    expect(timestring('5   D a YS    4 h   2 0     mI  nS')).to.equal(447600)
  })
})
