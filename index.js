var _ = require('lodash');

/**
 * Exports
 */

module.exports = parseTimestring;

/**
 * Default options to use when parsing a timestring
 *
 * @type {Object}
 */

var defaultOpts = {
  hoursPerDay: 24,
  daysPerWeek: 7,
  weeksPerMonth: 4,
  monthsPerYear: 12,
};

/**
 * Map of accepted strings to unit
 *
 * @type {Object}
 */

var unitMap = {
  ms: ['ms', 'milli', 'millisecond', 'milliseconds'],
  s: ['s', 'sec', 'secs', 'second', 'seconds'],
  m: ['m', 'min', 'mins', 'minute', 'minutes'],
  h: ['h', 'hr', 'hrs', 'hour', 'hours'],
  d: ['d', 'day', 'days'],
  w: ['w', 'week', 'weeks'],
  mth: ['mon', 'mth', 'mths','month', 'months'],
  y: ['y', 'yr', 'yrs', 'year', 'years'],
};

/**
 * Parse a timestring
 *
 * @param {string} string
 * @param {string} [returnUnit]
 * @param {Object} [opts]
 * @return {number}
 */

function parseTimestring(string, returnUnit, opts) {
  opts = _.extend(_.clone(defaultOpts), opts || {});

  var totalSeconds = 0;
  var unitValues = getUnitValues(opts);
  var groups = string
    .toLowerCase()
    .replace(/[^\.\w+-]+/g, '')
    .match(/[-+]?[0-9]+[a-z]+/g);

  if (groups !== null) {
    _.each(groups, function(group) {
      var value = group.match(/[0-9]+/g)[0];
      var unit = group.match(/[a-z]+/g)[0];

      totalSeconds += getSeconds(value, unit, unitValues);
    });
  }

  if (returnUnit) {
    return convert(totalSeconds, returnUnit, unitValues);
  }

  return totalSeconds;
}

/**
 * Get unit values based on the passed options
 *
 * @param {Object} opts
 * @returns {Object}
 */

function getUnitValues(opts) {
  var unitValues = {
    ms: 0.001,
    s: 1,
    m: 60,
    h: 3600,
  };

  unitValues.d = opts.hoursPerDay * unitValues.h;
  unitValues.w = opts.daysPerWeek * unitValues.d;
  unitValues.mth = opts.weeksPerMonth * unitValues.w;
  unitValues.y = opts.monthsPerYear * unitValues.mth;

  return unitValues;
}

/**
 * Get the key for a unit
 *
 * @param {string} unit
 * @returns {string}
 */

function getUnitKey(unit) {
  for (var k in unitMap) {
    for (var u in unitMap[k]) {
      if (unit === unitMap[k][u]) {
        return k;
      }
    }
  }

  throw new Error('The unit [' + unit + '] is not supported by timestring');
}

/**
 *  Get the number of seconds for a value, based on the unit
 *
 * @param {number} value
 * @param {string} unit
 * @param {Object} unitValues
 * @returns {number}
 */

function getSeconds(value, unit, unitValues) {
  var baseValue = unitValues[getUnitKey(unit)];

  return value * baseValue;
}

/**
 * Convert a value from its existing unit to a new unit
 *
 * @param {number} value
 * @param {string} unit
 * @param {Object} unitValues
 * @returns {number}
 */

function convert(value, unit, unitValues) {
  var baseValue = unitValues[getUnitKey(unit)];

  return value / baseValue;
}
