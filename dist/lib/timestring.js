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
//# sourceMappingURL=data:application/json;base64,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RTtBQUNyRCxTQUFPLEFBQUMsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNyRCxDQUFDIiwiZmlsZSI6InRpbWVzdHJpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lc3RyaW5nIHtcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MgPSB7fSkge1xuICAgIGNvbnN0IERFRkFVTFRfU0VUVElOR1MgPSB7XG4gICAgICBob3Vyc1BlckRheTogMjQsXG4gICAgICBkYXlzUGVyV2VlazogNyxcbiAgICAgIHdlZWtzUGVyTW9udGg6IDQsXG4gICAgICBtb250aHNQZXJZZWFyOiAxMlxuICAgIH07XG5cbiAgICAvLyBtZXJnZSBkZWZhdWx0IHNldHRpbmdzIHdpdGggdXNlciBzZXR0aW5nc1xuICAgIHRoaXMuc2V0dGluZ3MgPSBERUZBVUxUX1NFVFRJTkdTO1xuICAgIGZvciAobGV0IHMgaW4gc2V0dGluZ3MpIHsgdGhpcy5zZXR0aW5nc1tzXSA9IHNldHRpbmdzW3NdOyB9XG5cbiAgICAvLyB0aW1lIHVuaXRzXG4gICAgdGhpcy51bml0cyA9IHtcbiAgICAgIHM6IFsncycsICdzZWMnLCAnc2VjcycsICdzZWNvbmQnLCAnc2Vjb25kcyddLFxuICAgICAgbTogWydtJywgJ21pbicsICdtaW5zJywgJ21pbnV0ZScsICdtaW51dGVzJ10sXG4gICAgICBoOiBbJ2gnLCAnaHInLCAnaHJzJywgJ2hvdXInLCAnaG91cnMnXSxcbiAgICAgIGQ6IFsnZCcsICdkYXknLCAnZGF5cyddLFxuICAgICAgdzogWyd3JywgJ3dlZWsnLCAnd2Vla3MnXSxcbiAgICAgIG10aDogWydtdGgnLCAnbXRocycsJ21vbnRoJywgJ21vbnRocyddLFxuICAgICAgeTogWyd5JywgJ3lyJywgJ3lycycsICd5ZWFyJywgJ3llYXJzJ11cbiAgICB9O1xuXG4gICAgLy8gdGltZSB1bml0IHNlY29uZHMgbWFwcGluZ3NcbiAgICB0aGlzLnVuaXRWYWx1ZXMgPSB7XG4gICAgICBzOiAxLFxuICAgICAgbTogNjAsXG4gICAgICBoOiAzNjAwXG4gICAgfTtcblxuICAgIC8vIGR5bmFtaWMgdGltZSB1bml0IHNlY29uZHMgbWFwcGluZ3NcbiAgICAvLyB0aGVzZSBhcmUgZHluYW1pYyBiYXNlZCBvbiB0aGUgc2V0dGluZ3NcbiAgICB0aGlzLnVuaXRWYWx1ZXMuZCA9IHRoaXMuc2V0dGluZ3MuaG91cnNQZXJEYXkgKiB0aGlzLnVuaXRWYWx1ZXMuaDtcbiAgICB0aGlzLnVuaXRWYWx1ZXMudyA9IHRoaXMuc2V0dGluZ3MuZGF5c1BlcldlZWsgKiB0aGlzLnVuaXRWYWx1ZXMuZDtcbiAgICB0aGlzLnVuaXRWYWx1ZXMubXRoID0gdGhpcy5zZXR0aW5ncy53ZWVrc1Blck1vbnRoICogdGhpcy51bml0VmFsdWVzLnc7XG4gICAgdGhpcy51bml0VmFsdWVzLnkgPSB0aGlzLnNldHRpbmdzLm1vbnRoc1BlclllYXIgKiB0aGlzLnVuaXRWYWx1ZXMubXRoO1xuICB9XG5cbiAgcGFyc2Uoc3RyaW5nLCByZXR1cm5Vbml0ID0gJ3MnKSB7XG4gICAgLy8gZ2V0IHVuaXQga2V5IGhlbHBlclxuICAgIGxldCBnZXRVbml0S2V5ID0gKHVuaXQpID0+IHtcbiAgICAgIGZvciAodmFyIGsgaW4gdGhpcy51bml0cykge1xuICAgICAgICBmb3IgKHZhciB1IGluIHRoaXMudW5pdHNba10pIHtcbiAgICAgICAgICBpZiAodW5pdCA9PT0gdGhpcy51bml0c1trXVt1XSkge1xuICAgICAgICAgICAgcmV0dXJuIGs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHRocm93IGVycm9yIGlmIGludmFsaWQgdW5pdCB3YXMgcGFzc2VkXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSB1bml0IFsnICsgdW5pdCArICddIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGltZXN0cmluZycpO1xuICAgIH07XG5cbiAgICAvLyBjb252ZXJ0IGEgdmFsdWUgdG8gYSBzcGVjaWZpYyB1bml0XG4gICAgbGV0IGNvbnZlcnQgPSAodmFsdWUsIHVuaXQpID0+IHtcbiAgICAgIGxldCBiYXNlVmFsdWUgPSB0aGlzLnVuaXRWYWx1ZXNbZ2V0VW5pdEtleSh1bml0KV07XG5cbiAgICAgIHJldHVybiB2YWx1ZSAvIGJhc2VWYWx1ZTtcbiAgICB9O1xuXG4gICAgLy8gZ2V0IGEgdmFsdWUgaW4gc2Vjb25kcyBiYXNlZCBvbiBhIHNwZWNpZmljIHVuaXRcbiAgICBsZXQgZ2V0U2Vjb25kcyA9ICh2YWx1ZSwgdW5pdCkgPT4ge1xuICAgICAgbGV0IGJhc2VWYWx1ZSA9IHRoaXMudW5pdFZhbHVlc1tnZXRVbml0S2V5KHVuaXQpXTtcblxuICAgICAgcmV0dXJuIHZhbHVlICogYmFzZVZhbHVlO1xuICAgIH07XG5cbiAgICAvLyBzZWNvbmRzIGNvdW50ZXJcbiAgICBsZXQgdG90YWxTZWNvbmRzID0gMDtcblxuICAgIC8vIHNwbGl0IHN0cmluZyBpbnRvIGdyb3VwcyBhbmQgZ2V0IHRvdGFsIHNlY29uZHMgZm9yIGVhY2ggZ3JvdXBcbiAgICBsZXQgZ3JvdXBzID0gc3RyaW5nXG4gICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSAvLyBjb252ZXJ0IHdvcmRzIHRvIGxvd2VyIGNhc2VcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bXlxcLlxcdystXSsvZywgJycpIC8vIHJlbW92ZSB3aGl0ZSBzcGFjZVxuICAgICAgICAgICAgICAgICAgLm1hdGNoKC9bLStdP1swLTldK1thLXpdKy9nKTsgLy8gbWF0Y2ggdGltZSBncm91cHMgKGRpZ2l0IGZvbGxvd2VkIGJ5IHRpbWUgdW5pdCAtIGkuZSA1ZCAxNW0gPSAyIHRpbWUgZ3JvdXBzKVxuXG4gICAgaWYgKGdyb3VwcyAhPT0gbnVsbCkge1xuICAgICAgZm9yKGxldCBncm91cCBpbiBncm91cHMpIHtcbiAgICAgICAgbGV0IGcgPSBncm91cHNbZ3JvdXBdO1xuICAgICAgICBsZXQgdmFsdWUgPSBnLm1hdGNoKC9bMC05XSsvZylbMF07XG4gICAgICAgIGxldCB1bml0ID0gZy5tYXRjaCgvW2Etel0rL2cpWzBdO1xuXG4gICAgICAgIHRvdGFsU2Vjb25kcyArPSBnZXRTZWNvbmRzKHZhbHVlLCB1bml0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29udmVydCh0b3RhbFNlY29uZHMsIHJldHVyblVuaXQpO1xuICB9XG59XG5cblN0cmluZy5wcm90b3R5cGUucGFyc2VUaW1lID0gZnVuY3Rpb24gKHVuaXQsIHNldHRpbmdzKSB7XG4gIHJldHVybiAobmV3IFRpbWVzdHJpbmcoc2V0dGluZ3MpKS5wYXJzZSh0aGlzLCB1bml0KTtcbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=