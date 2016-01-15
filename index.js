/**
 * Exports
 */

module.exports = Timestring;

/**
 * Create a new Timestring instance
 *
 * @param {Object} opts
 * @constructor
 */

function Timestring(opts) {
  var defaultOpts = {
    hoursPerDay: 24,
    daysPerWeek: 7,
    weeksPerMonth: 4,
    monthsPerYear: 12,
  };

  opts = opts || {};
  this.opts = defaultOpts;
  for (var s in opts) { this.opts[s] = opts[s]; }

  this.units = {
    s: ['s', 'sec', 'secs', 'second', 'seconds'],
    m: ['m', 'min', 'mins', 'minute', 'minutes'],
    h: ['h', 'hr', 'hrs', 'hour', 'hours'],
    d: ['d', 'day', 'days'],
    w: ['w', 'week', 'weeks'],
    mth: ['mth', 'mths','month', 'months'],
    y: ['y', 'yr', 'yrs', 'year', 'years'],
  };

  this.unitValues = {
    s: 1,
    m: 60,
    h: 3600,
  };

  this.unitValues.d = this.opts.hoursPerDay * this.unitValues.h;
  this.unitValues.w = this.opts.daysPerWeek * this.unitValues.d;
  this.unitValues.mth = this.opts.weeksPerMonth * this.unitValues.w;
  this.unitValues.y = this.opts.monthsPerYear * this.unitValues.mth;
}

/**
 * Parse a timestring
 *
 * @param  {string} string
 * @param  {string} returnUnit
 * @return {string}
 */

Timestring.prototype.parse = function parse(string, returnUnit) {
  function getUnitKey(unit) {
    for (var k in this.units) {
      for (var u in this.units[k]) {
        if (unit === this.units[k][u]) {
          return k;
        }
      }
    }

    throw new Error('The unit [' + unit + '] is not supported by timestring');
  }

  function convert(value, unit) {
    var baseValue = this.unitValues[getUnitKey.call(this, unit)];

    return value / baseValue;
  }

  function getSeconds(value, unit) {
    var baseValue = this.unitValues[getUnitKey.call(this, unit)];

    return value * baseValue;
  }

  var totalSeconds = 0;
  var groups = string
                .toLowerCase()
                .replace(/[^\.\w+-]+/g, '')
                .match(/[-+]?[0-9]+[a-z]+/g);

  if (groups !== null) {
    for (var i = 0; i < groups.length; i++) {
      var g = groups[i];
      var value = g.match(/[0-9]+/g)[0];
      var unit = g.match(/[a-z]+/g)[0];

      totalSeconds += getSeconds.call(this, value, unit);
    }
  }

  return (returnUnit) ?
    convert.call(this, totalSeconds, returnUnit) :
    totalSeconds;
};
