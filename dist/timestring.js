(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Timestring = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0aW1lc3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FxQixVQUFVO0FBQ2xCLFdBRFEsVUFBVSxHQUNGO1FBQWYsUUFBUSxnQ0FBRyxFQUFFOzswQkFETixVQUFVOztBQUUzQixRQUFNLGdCQUFnQixHQUFHO0FBQ3ZCLGlCQUFXLEVBQUUsRUFBRTtBQUNmLGlCQUFXLEVBQUUsQ0FBQztBQUNkLG1CQUFhLEVBQUUsQ0FBQztBQUNoQixtQkFBYSxFQUFFLEVBQUU7S0FDbEIsQ0FBQzs7O0FBR0YsUUFBSSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQztBQUNqQyxTQUFLLElBQUksQ0FBQyxJQUFJLFFBQVEsRUFBRTtBQUFFLFVBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUU7OztBQUczRCxRQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1gsT0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztBQUM1QyxPQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDO0FBQzVDLE9BQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7QUFDdEMsT0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7QUFDdkIsT0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7QUFDekIsU0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxPQUFPLEVBQUUsUUFBUSxDQUFDO0FBQ3RDLE9BQUMsRUFBRSxDQUFDLEdB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QVYsVUFBVTs7QUEyRi9CLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLFVBQVUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNyRCxTQUFPLEFBQUMsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNyRCxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVzdHJpbmcge1xuICBjb25zdHJ1Y3RvcihzZXR0aW5ncyA9IHt9KSB7XG4gICAgY29uc3QgREVGQVVMVF9TRVRUSU5HUyA9IHtcbiAgICAgIGhvdXJzUGVyRGF5OiAyNCxcbiAgICAgIGRheXNQZXJXZWVrOiA3LFxuICAgICAgd2Vla3NQZXJNb250aDogNCxcbiAgICAgIG1vbnRoc1BlclllYXI6IDEyXG4gICAgfTtcblxuICAgIC8vIG1lcmdlIGRlZmF1bHQgc2V0dGluZ3Mgd2l0aCB1c2VyIHNldHRpbmdzXG4gICAgdGhpcy5zZXR0aW5ncyA9IERFRkFVTFRfU0VUVElOR1M7XG4gICAgZm9yIChsZXQgcyBpbiBzZXR0aW5ncykgeyB0aGlzLnNldHRpbmdzW3NdID0gc2V0dGluZ3Nbc107IH1cblxuICAgIC8vIHRpbWUgdW5pdHNcbiAgICB0aGlzLnVuaXRzID0ge1xuICAgICAgczogWydzJywgJ3NlYycsICdzZWNzJywgJ3NlY29uZCcsICdzZWNvbmRzJ10sXG4gICAgICBtOiBbJ20nLCAnbWluJywgJ21pbnMnLCAnbWludXRlJywgJ21pbnV0ZXMnXSxcbiAgICAgIGg6IFsnaCcsICdocicsICdocnMnLCAnaG91cicsICdob3VycyddLFxuICAgICAgZDogWydkJywgJ2RheScsICdkYXlzJ10sXG4gICAgICB3OiBbJ3cnLCAnd2VlaycsICd3ZWVrcyddLFxuICAgICAgbXRoOiBbJ210aCcsICdtdGhzJywnbW9udGgnLCAnbW9udGhzJ10sXG4gICAgICB5OiBbJ3knLCAneXInLCAneXJzJywgJ3llYXInLCAneWVhcnMnXVxuICAgIH07XG5cbiAgICAvLyB0aW1lIHVuaXQgc2Vjb25kcyBtYXBwaW5nc1xuICAgIHRoaXMudW5pdFZhbHVlcyA9IHtcbiAgICAgIHM6IDEsXG4gICAgICBtOiA2MCxcbiAgICAgIGg6IDM2MDBcbiAgICB9O1xuXG4gICAgLy8gZHluYW1pYyB0aW1lIHVuaXQgc2Vjb25kcyBtYXBwaW5nc1xuICAgIC8vIHRoZXNlIGFyZSBkeW5hbWljIGJhc2VkIG9uIHRoZSBzZXR0aW5nc1xuICAgIHRoaXMudW5pdFZhbHVlcy5kID0gdGhpcy5zZXR0aW5ncy5ob3Vyc1BlckRheSAqIHRoaXMudW5pdFZhbHVlcy5oO1xuICAgIHRoaXMudW5pdFZhbHVlcy53ID0gdGhpcy5zZXR0aW5ncy5kYXlzUGVyV2VlayAqIHRoaXMudW5pdFZhbHVlcy5kO1xuICAgIHRoaXMudW5pdFZhbHVlcy5tdGggPSB0aGlzLnNldHRpbmdzLndlZWtzUGVyTW9udGggKiB0aGlzLnVuaXRWYWx1ZXMudztcbiAgICB0aGlzLnVuaXRWYWx1ZXMueSA9IHRoaXMuc2V0dGluZ3MubW9udGhzUGVyWWVhciAqIHRoaXMudW5pdFZhbHVlcy5tdGg7XG4gIH1cblxuICBwYXJzZShzdHJpbmcsIHJldHVyblVuaXQgPSAncycpIHtcbiAgICAvLyBnZXQgdW5pdCBrZXkgaGVscGVyXG4gICAgbGV0IGdldFVuaXRLZXkgPSAodW5pdCkgPT4ge1xuICAgICAgZm9yICh2YXIgayBpbiB0aGlzLnVuaXRzKSB7XG4gICAgICAgIGZvciAodmFyIHUgaW4gdGhpcy51bml0c1trXSkge1xuICAgICAgICAgIGlmICh1bml0ID09PSB0aGlzLnVuaXRzW2tdW3VdKSB7XG4gICAgICAgICAgICByZXR1cm4gaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gdGhyb3cgZXJyb3IgaWYgaW52YWxpZCB1bml0IHdhcyBwYXNzZWRcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHVuaXQgWycgKyB1bml0ICsgJ10gaXMgbm90IHN1cHBvcnRlZCBieSB0aW1lc3RyaW5nJyk7XG4gICAgfTtcblxuICAgIC8vIGNvbnZlcnQgYSB2YWx1ZSB0byBhIHNwZWNpZmljIHVuaXRcbiAgICBsZXQgY29udmVydCA9ICh2YWx1ZSwgdW5pdCkgPT4ge1xuICAgICAgbGV0IGJhc2VWYWx1ZSA9IHRoaXMudW5pdFZhbHVlc1tnZXRVbml0S2V5KHVuaXQpXTtcblxuICAgICAgcmV0dXJuIHZhbHVlIC8gYmFzZVZhbHVlO1xuICAgIH07XG5cbiAgICAvLyBnZXQgYSB2YWx1ZSBpbiBzZWNvbmRzIGJhc2VkIG9uIGEgc3BlY2lmaWMgdW5pdFxuICAgIGxldCBnZXRTZWNvbmRzID0gKHZhbHVlLCB1bml0KSA9PiB7XG4gICAgICBsZXQgYmFzZVZhbHVlID0gdGhpcy51bml0VmFsdWVzW2dldFVuaXRLZXkodW5pdCldO1xuXG4gICAgICByZXR1cm4gdmFsdWUgKiBiYXNlVmFsdWU7XG4gICAgfTtcblxuICAgIC8vIHNlY29uZHMgY291bnRlclxuICAgIGxldCB0b3RhbFNlY29uZHMgPSAwO1xuXG4gICAgLy8gc3BsaXQgc3RyaW5nIGludG8gZ3JvdXBzIGFuZCBnZXQgdG90YWwgc2Vjb25kcyBmb3IgZWFjaCBncm91cFxuICAgIGxldCBncm91cHMgPSBzdHJpbmdcbiAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpIC8vIGNvbnZlcnQgd29yZHMgdG8gbG93ZXIgY2FzZVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1teXFwuXFx3Ky1dKy9nLCAnJykgLy8gcmVtb3ZlIHdoaXRlIHNwYWNlXG4gICAgICAgICAgICAgICAgICAubWF0Y2goL1stK10/WzAtOV0rW2Etel0rL2cpOyAvLyBtYXRjaCB0aW1lIGdyb3VwcyAoZGlnaXQgZm9sbG93ZWQgYnkgdGltZSB1bml0IC0gaS5lIDVkIDE1bSA9IDIgdGltZSBncm91cHMpXG5cbiAgICBpZiAoZ3JvdXBzICE9PSBudWxsKSB7XG4gICAgICBmb3IobGV0IGdyb3VwIGluIGdyb3Vwcykge1xuICAgICAgICBsZXQgZyA9IGdyb3Vwc1tncm91cF07XG4gICAgICAgIGxldCB2YWx1ZSA9IGcubWF0Y2goL1swLTldKy9nKVswXTtcbiAgICAgICAgbGV0IHVuaXQgPSBnLm1hdGNoKC9bYS16XSsvZylbMF07XG5cbiAgICAgICAgdG90YWxTZWNvbmRzICs9IGdldFNlY29uZHModmFsdWUsIHVuaXQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb252ZXJ0KHRvdGFsU2Vjb25kcywgcmV0dXJuVW5pdCk7XG4gIH1cbn1cblxuU3RyaW5nLnByb3RvdHlwZS5wYXJzZVRpbWUgPSBmdW5jdGlvbiAodW5pdCwgc2V0dGluZ3MpIHtcbiAgcmV0dXJuIChuZXcgVGltZXN0cmluZyhzZXR0aW5ncykpLnBhcnNlKHRoaXMsIHVuaXQpO1xufTtcbiJdfQ==
