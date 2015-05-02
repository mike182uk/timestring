'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var Timestring = (function () {
  function Timestring() {
    var settings = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Timestring);

    var DEFAULT_SETTINGS = {
      hoursPerDay: 24,
      daysPerWeek: 7,
      weeksPerMonth: 4,
      monthsPerYear: 12
    };

    // merge default settings with user settings
    this.settings = DEFAULT_SETTINGS;
    for (var s in settings) {
      this.settings[s] = settings[s];
    }

    // time units
    this.units = {
      s: ['s', 'sec', 'secs', 'second', 'seconds'],
      m: ['m', 'min', 'mins', 'minute', 'minutes'],
      h: ['h', 'hr', 'hrs', 'hour', 'hours'],
      d: ['d', 'day', 'days'],
      w: ['w', 'week', 'weeks'],
      mth: ['mth', 'mths', 'month', 'months'],
      y: ['y', 'yr', 'yrs', 'year', 'years']
    };

    // time unit seconds mappings
    this.unitValues = {
      s: 1,
      m: 60,
      h: 3600
    };

    // dynamic time unit seconds mappings
    // these are dynamic based on the settings
    this.unitValues.d = this.settings.hoursPerDay * this.unitValues.h;
    this.unitValues.w = this.settings.daysPerWeek * this.unitValues.d;
    this.unitValues.mth = this.settings.weeksPerMonth * this.unitValues.w;
    this.unitValues.y = this.settings.monthsPerYear * this.unitValues.mth;
  }

  _createClass(Timestring, [{
    key: 'parse',
    value: function parse(string) {
      var _this = this;

      var returnUnit = arguments[1] === undefined ? 's' : arguments[1];

      // get unit key helper
      var getUnitKey = function getUnitKey(unit) {
        for (var k in _this.units) {
          for (var u in _this.units[k]) {
            if (unit === _this.units[k][u]) {
              return k;
            }
          }
        }

        // throw error if invalid unit was passed
        throw new Error('The unit [' + unit + '] is not supported by timestring');
      };

      // convert a value to a specific unit
      var convert = function convert(value, unit) {
        var baseValue = _this.unitValues[getUnitKey(unit)];

        return value / baseValue;
      };

      // get a value in seconds based on a specific unit
      var getSeconds = function getSeconds(value, unit) {
        var baseValue = _this.unitValues[getUnitKey(unit)];

        return value * baseValue;
      };

      // seconds counter
      var totalSeconds = 0;

      // split string into groups and get total seconds for each group
      var groups = string.toLowerCase() // convert words to lower case
      .replace(/[^\.\w+-]+/g, '') // remove white space
      .match(/[-+]?[0-9]+[a-z]+/g); // match time groups (digit followed by time unit - i.e 5d 15m = 2 time groups)

      if (groups !== null) {
        for (var group in groups) {
          var g = groups[group];
          var value = g.match(/[0-9]+/g)[0];
          var unit = g.match(/[a-z]+/g)[0];

          totalSeconds += getSeconds(value, unit);
        }
      }

      return convert(totalSeconds, returnUnit);
    }
  }]);

  return Timestring;
})();

exports['default'] = Timestring;

String.prototype.parseTime = function (unit, settings) {
  return new Timestring(settings).parse(this, unit);
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRpbWVzdHJpbmcuanMiLCJTdHJpbmcucGFyc2VUaW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBQSxVQUFBO0FBQ0EsV0FEQSxVQUFBLEdBQ0E7UUFBQSxRQUFBLGdDQUFBLEVBQUE7OzBCQURBLFVBQUE7O0FBRUEsUUFBQSxnQkFBQSxHQUFBO0FBQ0EsaUJBQUEsRUFBQSxFQUFBO0FBQ0EsaUJBQUEsRUFBQSxDQUFBO0FBQ0EsbUJBQUEsRUFBQSxDQUFBO0FBQ0EsbUJBQUEsRUFBQSxFQUFBO0tBQ0EsQ0FBQTs7O0FBR0EsUUFBQSxDQUFBLFFBQUEsR0FBQSxnQkFBQSxDQUFBO0FBQ0EsU0FBQSxJQUFBLENBQUEsSUFBQSxRQUFBLEVBQUE7QUFBQSxVQUFBLENBQUEsUUFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLFFBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtLQUFBOzs7QUFHQSxRQUFBLENBQUEsS0FBQSxHQUFBO0FBQ0EsT0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQSxNQUFBLEVBQUEsUUFBQSxFQUFBLFNBQUEsQ0FBQTtBQUNBLE9BQUEsRUFBQSxDQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUEsTUFBQSxFQUFBLFFBQUEsRUFBQSxTQUFBLENBQUE7QUFDQSxPQUFBLEVBQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQSxNQUFBLEVBQUEsT0FBQSxDQUFBO0FBQ0EsT0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQSxNQUFBLENBQUE7QUFDQSxPQUFBLEVBQUEsQ0FBQSxHQUFBLEVBQUEsTUFBQSxFQUFBLE9BQUEsQ0FBQTtBQUNBLFNBQUEsRUFBQSxDQUFBLEtBQUEsRUFBQSxNQUFBLEVBQUEsT0FBQSxFQUFBLFFBQUEsQ0FBQTtBQUNBLE9BQUEsRUFBQSxDQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLENBQUE7S0FDQSxDQUFBOzs7QUFHQSxRQUFBLENBQUEsVUFBQSxHQUFBO0FBQ0EsT0FBQSxFQUFBLENBQUE7QUFDQSxPQUFBLEVBQUEsRUFBQTtBQUNBLE9BQUEsRUFBQSxJQUFBO0tBQ0EsQ0FBQTs7OztBQUlBLFFBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxRQUFBLENBQUEsV0FBQSxHQUFBLElBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsUUFBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLFFBQUEsQ0FBQSxXQUFBLEdBQUEsSUFBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQSxRQUFBLENBQUEsVUFBQSxDQUFBLEdBQUEsR0FBQSxJQUFBLENBQUEsUUFBQSxDQUFBLGFBQUEsR0FBQSxJQUFBLENBQUEsVUFBQSxDQUFBLENBQUEsQ0FBQTtBQUNBLFFBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxRQUFBLENBQUEsYUFBQSxHQUFBLElBQUEsQ0FBQSxVQUFBLENBQUEsR0FBQSxDQUFBO0dBQ0E7O2VBckNBLFVBQUE7O1dBdUNBLGVBQUEsTUFBQSxFQUFBOzs7VUFBQSxVQUFBLGdDQUFBLEdBQUE7OztBQUVBLFVBQUEsVUFBQSxHQUFBLFNBQUEsVUFBQSxDQUFBLElBQUEsRUFBQTtBQUNBLGFBQUEsSUFBQSxDQUFBLElBQUEsTUFBQSxLQUFBLEVBQUE7QUFDQSxlQUFBLElBQUEsQ0FBQSxJQUFBLE1BQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBO0FBQ0EsZ0JBQUEsSUFBQSxLQUFBLE1BQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBO0FBQ0EscUJBQUEsQ0FBQSxDQUFBO2FBQ0E7V0FDQTtTQUNBOzs7QUFHQSxjQUFBLElBQUEsS0FBQSxDQUFBLFlBQUEsR0FBQSxJQUFBLEdBQUEsa0NBQUEsQ0FBQSxDQUFBO09BQ0EsQ0FBQTs7O0FBR0EsVUFBQSxPQUFBLEdBQUEsU0FBQSxPQUFBLENBQUEsS0FBQSxFQUFBLElBQUEsRUFBQTtBQUNBLFlBQUEsU0FBQSxHQUFBLE1BQUEsVUFBQSxDQUFBLFVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBOztBQUVBLGVBQUEsS0FBQSxHQUFBLFNBQUEsQ0FBQTtPQUNBLENBQUE7OztBQUdBLFVBQUEsVUFBQSxHQUFBLFNBQUEsVUFBQSxDQUFBLEtBQUEsRUFBQSxJQUFBLEVBQUE7QUFDQSxZQUFBLFNBQUEsR0FBQSxNQUFBLFVBQUEsQ0FBQSxVQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQTs7QUFFQSxlQUFBLEtBQUEsR0FBQSxTQUFBLENBQUE7T0FDQSxDQUFBOzs7QUFHQSxVQUFBLFlBQUEsR0FBQSxDQUFBLENBQUE7OztBQUdBLFVBQUEsTUFBQSxHQUFBLE1BQUEsQ0FDQSxXQUFBLEVBQUE7T0FDQSxPQUFBLENBQUEsYUFBQSxFQUFBLEVBQUEsQ0FBQTtPQUNBLEtBQUEsQ0FBQSxvQkFBQSxDQUFBLENBQUE7O0FBRUEsVUFBQSxNQUFBLEtBQUEsSUFBQSxFQUFBO0FBQ0EsYUFBQSxJQUFBLEtBQUEsSUFBQSxNQUFBLEVBQUE7QUFDQSxjQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsS0FBQSxDQUFBLENBQUE7QUFDQSxjQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsS0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsY0FBQSxJQUFBLEdBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTs7QUFFQSxzQkFBQSxJQUFBLFVBQUEsQ0FBQSxLQUFBLEVBQUEsSUFBQSxDQUFBLENBQUE7U0FDQTtPQUNBOztBQUVBLGFBQUEsT0FBQSxDQUFBLFlBQUEsRUFBQSxVQUFBLENBQUEsQ0FBQTtLQUNBOzs7U0F4RkEsVUFBQTs7O3FCQUFBLFVBQUE7O0FDQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxTQUFBLEdBQUEsVUFBQSxJQUFBLEVBQUEsUUFBQSxFQUFBO0FBQ0EsU0FBQSxJQUFBLFVBQUEsQ0FBQSxRQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsQ0FBQSxDQUFBO0NBQ0EsQ0FBQSIsImZpbGUiOiJ0aW1lc3RyaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZXN0cmluZyB7XG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzID0ge30pIHtcbiAgICBjb25zdCBERUZBVUxUX1NFVFRJTkdTID0ge1xuICAgICAgaG91cnNQZXJEYXk6IDI0LFxuICAgICAgZGF5c1BlcldlZWs6IDcsXG4gICAgICB3ZWVrc1Blck1vbnRoOiA0LFxuICAgICAgbW9udGhzUGVyWWVhcjogMTJcbiAgICB9O1xuXG4gICAgLy8gbWVyZ2UgZGVmYXVsdCBzZXR0aW5ncyB3aXRoIHVzZXIgc2V0dGluZ3NcbiAgICB0aGlzLnNldHRpbmdzID0gREVGQVVMVF9TRVRUSU5HUztcbiAgICBmb3IgKGxldCBzIGluIHNldHRpbmdzKSB7IHRoaXMuc2V0dGluZ3Nbc10gPSBzZXR0aW5nc1tzXTsgfVxuXG4gICAgLy8gdGltZSB1bml0c1xuICAgIHRoaXMudW5pdHMgPSB7XG4gICAgICBzOiBbJ3MnLCAnc2VjJywgJ3NlY3MnLCAnc2Vjb25kJywgJ3NlY29uZHMnXSxcbiAgICAgIG06IFsnbScsICdtaW4nLCAnbWlucycsICdtaW51dGUnLCAnbWludXRlcyddLFxuICAgICAgaDogWydoJywgJ2hyJywgJ2hycycsICdob3VyJywgJ2hvdXJzJ10sXG4gICAgICBkOiBbJ2QnLCAnZGF5JywgJ2RheXMnXSxcbiAgICAgIHc6IFsndycsICd3ZWVrJywgJ3dlZWtzJ10sXG4gICAgICBtdGg6IFsnbXRoJywgJ210aHMnLCdtb250aCcsICdtb250aHMnXSxcbiAgICAgIHk6IFsneScsICd5cicsICd5cnMnLCAneWVhcicsICd5ZWFycyddXG4gICAgfTtcblxuICAgIC8vIHRpbWUgdW5pdCBzZWNvbmRzIG1hcHBpbmdzXG4gICAgdGhpcy51bml0VmFsdWVzID0ge1xuICAgICAgczogMSxcbiAgICAgIG06IDYwLFxuICAgICAgaDogMzYwMFxuICAgIH07XG5cbiAgICAvLyBkeW5hbWljIHRpbWUgdW5pdCBzZWNvbmRzIG1hcHBpbmdzXG4gICAgLy8gdGhlc2UgYXJlIGR5bmFtaWMgYmFzZWQgb24gdGhlIHNldHRpbmdzXG4gICAgdGhpcy51bml0VmFsdWVzLmQgPSB0aGlzLnNldHRpbmdzLmhvdXJzUGVyRGF5ICogdGhpcy51bml0VmFsdWVzLmg7XG4gICAgdGhpcy51bml0VmFsdWVzLncgPSB0aGlzLnNldHRpbmdzLmRheXNQZXJXZWVrICogdGhpcy51bml0VmFsdWVzLmQ7XG4gICAgdGhpcy51bml0VmFsdWVzLm10aCA9IHRoaXMuc2V0dGluZ3Mud2Vla3NQZXJNb250aCAqIHRoaXMudW5pdFZhbHVlcy53O1xuICAgIHRoaXMudW5pdFZhbHVlcy55ID0gdGhpcy5zZXR0aW5ncy5tb250aHNQZXJZZWFyICogdGhpcy51bml0VmFsdWVzLm10aDtcbiAgfVxuXG4gIHBhcnNlKHN0cmluZywgcmV0dXJuVW5pdCA9ICdzJykge1xuICAgIC8vIGdldCB1bml0IGtleSBoZWxwZXJcbiAgICBsZXQgZ2V0VW5pdEtleSA9ICh1bml0KSA9PiB7XG4gICAgICBmb3IgKHZhciBrIGluIHRoaXMudW5pdHMpIHtcbiAgICAgICAgZm9yICh2YXIgdSBpbiB0aGlzLnVuaXRzW2tdKSB7XG4gICAgICAgICAgaWYgKHVuaXQgPT09IHRoaXMudW5pdHNba11bdV0pIHtcbiAgICAgICAgICAgIHJldHVybiBrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB0aHJvdyBlcnJvciBpZiBpbnZhbGlkIHVuaXQgd2FzIHBhc3NlZFxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgdW5pdCBbJyArIHVuaXQgKyAnXSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRpbWVzdHJpbmcnKTtcbiAgICB9O1xuXG4gICAgLy8gY29udmVydCBhIHZhbHVlIHRvIGEgc3BlY2lmaWMgdW5pdFxuICAgIGxldCBjb252ZXJ0ID0gKHZhbHVlLCB1bml0KSA9PiB7XG4gICAgICBsZXQgYmFzZVZhbHVlID0gdGhpcy51bml0VmFsdWVzW2dldFVuaXRLZXkodW5pdCldO1xuXG4gICAgICByZXR1cm4gdmFsdWUgLyBiYXNlVmFsdWU7XG4gICAgfTtcblxuICAgIC8vIGdldCBhIHZhbHVlIGluIHNlY29uZHMgYmFzZWQgb24gYSBzcGVjaWZpYyB1bml0XG4gICAgbGV0IGdldFNlY29uZHMgPSAodmFsdWUsIHVuaXQpID0+IHtcbiAgICAgIGxldCBiYXNlVmFsdWUgPSB0aGlzLnVuaXRWYWx1ZXNbZ2V0VW5pdEtleSh1bml0KV07XG5cbiAgICAgIHJldHVybiB2YWx1ZSAqIGJhc2VWYWx1ZTtcbiAgICB9O1xuXG4gICAgLy8gc2Vjb25kcyBjb3VudGVyXG4gICAgbGV0IHRvdGFsU2Vjb25kcyA9IDA7XG5cbiAgICAvLyBzcGxpdCBzdHJpbmcgaW50byBncm91cHMgYW5kIGdldCB0b3RhbCBzZWNvbmRzIGZvciBlYWNoIGdyb3VwXG4gICAgbGV0IGdyb3VwcyA9IHN0cmluZ1xuICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkgLy8gY29udmVydCB3b3JkcyB0byBsb3dlciBjYXNlXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgvW15cXC5cXHcrLV0rL2csICcnKSAvLyByZW1vdmUgd2hpdGUgc3BhY2VcbiAgICAgICAgICAgICAgICAgIC5tYXRjaCgvWy0rXT9bMC05XStbYS16XSsvZyk7IC8vIG1hdGNoIHRpbWUgZ3JvdXBzIChkaWdpdCBmb2xsb3dlZCBieSB0aW1lIHVuaXQgLSBpLmUgNWQgMTVtID0gMiB0aW1lIGdyb3VwcylcblxuICAgIGlmIChncm91cHMgIT09IG51bGwpIHtcbiAgICAgIGZvcihsZXQgZ3JvdXAgaW4gZ3JvdXBzKSB7XG4gICAgICAgIGxldCBnID0gZ3JvdXBzW2dyb3VwXTtcbiAgICAgICAgbGV0IHZhbHVlID0gZy5tYXRjaCgvWzAtOV0rL2cpWzBdO1xuICAgICAgICBsZXQgdW5pdCA9IGcubWF0Y2goL1thLXpdKy9nKVswXTtcblxuICAgICAgICB0b3RhbFNlY29uZHMgKz0gZ2V0U2Vjb25kcyh2YWx1ZSwgdW5pdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnZlcnQodG90YWxTZWNvbmRzLCByZXR1cm5Vbml0KTtcbiAgfVxufVxuIiwiU3RyaW5nLnByb3RvdHlwZS5wYXJzZVRpbWUgPSBmdW5jdGlvbiAodW5pdCwgc2V0dGluZ3MpIHtcbiAgcmV0dXJuIChuZXcgVGltZXN0cmluZyhzZXR0aW5ncykpLnBhcnNlKHRoaXMsIHVuaXQpO1xufTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==