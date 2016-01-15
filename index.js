module.exports = Timestring;

function Timestring(settings) {
  // default settings
  var defaults = {
    hoursPerDay: 24,
    daysPerWeek: 7,
    weeksPerMonth: 4,
    monthsPerYear: 12,
  };

  // merge default settings with user settings
  settings = settings || {};
  this.settings = defaults;
  for (var s in settings) { this.settings[s] = settings[s]; }

  // time units
  this.units = {
    s: ['s', 'sec', 'secs', 'second', 'seconds'],
    m: ['m', 'min', 'mins', 'minute', 'minutes'],
    h: ['h', 'hr', 'hrs', 'hour', 'hours'],
    d: ['d', 'day', 'days'],
    w: ['w', 'week', 'weeks'],
    mth: ['mth', 'mths','month', 'months'],
    y: ['y', 'yr', 'yrs', 'year', 'years'],
  };

  // time unit seconds mappings
  this.unitValues = {
    s: 1,
    m: 60,
    h: 3600,
  };

  // dynamic time unit seconds mappings
  // these are dynamic based on the settings
  this.unitValues.d = this.settings.hoursPerDay * this.unitValues.h;
  this.unitValues.w = this.settings.daysPerWeek * this.unitValues.d;
  this.unitValues.mth = this.settings.weeksPerMonth * this.unitValues.w;
  this.unitValues.y = this.settings.monthsPerYear * this.unitValues.mth;
}

Timestring.prototype.parse = function(string, returnUnit) {
  // reference to this
  var that = this;

  // get unit key helper
  function getUnitKey(unit) {
    for (var k in that.units) {
      for (var u in that.units[k]) {
        if (unit === that.units[k][u]) {
          return k;
        }
      }
    }

    // throw error if invalid unit was passed
    throw new Error('The unit [' + unit + '] is not supported by timestring');
  }

  // convert a value to a specific unit
  function convert(value, unit) {
    var baseValue = that.unitValues[getUnitKey(unit)];

    return value / baseValue;
  }

  // get a value in seconds based on a specific unit
  function getSeconds(value, unit) {
    var baseValue = that.unitValues[getUnitKey(unit)];

    return value * baseValue;
  }

  // seconds counter
  var totalSeconds = 0;

  // split string into groups and get total seconds for each group
  var groups = string
                .toLowerCase() // convert words to lower case
                .replace(/[^\.\w+-]+/g, '') // remove white space
                .match(/[-+]?[0-9]+[a-z]+/g); // match time groups

  if (groups !== null) {
    for (var i = 0; i < groups.length; i++) {
      var g = groups[i];
      var value = g.match(/[0-9]+/g)[0];
      var unit = g.match(/[a-z]+/g)[0];

      totalSeconds += getSeconds(value, unit);
    }
  }

  // return total, convert if needed
  return (returnUnit) ? convert(totalSeconds, returnUnit) : totalSeconds;
};

// add convenience method to string prototype
String.prototype.parseTime = function(unit, settings) {
  return (new Timestring(settings)).parse(this, unit);
};
