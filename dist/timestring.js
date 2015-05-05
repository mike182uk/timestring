(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Timestring = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
      s: ["s", "sec", "secs", "second", "seconds"],
      m: ["m", "min", "mins", "minute", "minutes"],
      h: ["h", "hr", "hrs", "hour", "hours"],
      d: ["d", "day", "days"],
      w: ["w", "week", "weeks"],
      mth: ["mth", "mths", "month", "months"],
      y: ["y", "yr", "yrs", "year", "years"]
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
    key: "parse",
    value: function parse(string) {
      var _this = this;

      var returnUnit = arguments[1] === undefined ? "s" : arguments[1];

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
        throw new Error("The unit [" + unit + "] is not supported by timestring");
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
      .replace(/[^\.\w+-]+/g, "") // remove white space
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

exports["default"] = Timestring;

String.prototype.parseTime = function (unit, settings) {
  return new Timestring(settings).parse(this, unit);
};
module.exports = exports["default"];

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJUaW1lc3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FBLFVBQUE7QUFDQSxXQURBLFVBQUEsR0FDQTtRQUFBLFFBQUEsZ0NBQUEsRUFBQTs7MEJBREEsVUFBQTs7QUFFQSxRQUFBLGdCQUFBLEdBQUE7QUFDQSxpQkFBQSxFQUFBLEVBQUE7QUFDQSxpQkFBQSxFQUFBLENBQUE7QUFDQSxtQkFBQSxFQUFBLENBQUE7QUFDQSxtQkFBQSxFQUFBLEVBQUE7S0FDQSxDQUFBOzs7QUFHQSxRQUFBLENBQUEsUUFBQSxHQUFBLGdCQUFBLENBQUE7QUFDQSxTQUFBLElBQUEsQ0FBQSxJQUFBLFFBQUEsRUFBQTtBQUFBLFVBQUEsQ0FBQSxRQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUEsUUFBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO0tBQUE7OztBQUdBLFFBQUEsQ0FBQSxLQUFBLEdBQUE7QUFDQSxPQUFBLEVBQUEsQ0FBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsU0FBQSxDQUFBO0FBQ0EsT0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQSxNQUFBLEVBQUEsUUFBQSxFQUFBLFNBQUEsQ0FBQTtBQUNBLE9BQUEsRUFBQSxDQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLENBQUE7QUFDQSxPQUFBLEVBQUEsQ0FBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLE1BQUEsQ0FBQTtBQUNBLE9BQUEsRUFBQSxDQUFBLEdBQUEsRUFBQSxNQUFBLEVBQUEsT0FBQSxDQUFBO0FBQ0EsU0FBQSxFQUFBLENBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxDQUFBO0FBQ0EsT0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxLQUFBLEVBQUEsTUFBQSxFQUFBLE9BQUEsQ0FBQTtLQUNBLENBQUE7OztBQUdBLFFBQUEsQ0FBQSxVQUFBLEdBQUE7QUFDQSxPQUFBLEVBQUEsQ0FBQTtBQUNBLE9BQUEsRUFBQSxFQUFBO0FBQ0EsT0FBQSxFQUFBLElBQUE7S0FDQSxDQUFBOzs7O0FBSUEsUUFBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLFFBQUEsQ0FBQSxXQUFBLEdBQUEsSUFBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQSxRQUFBLENBQUEsVUFBQSxDQUFBLENBQUEsR0FBQSxJQUFBLENBQUEsUUFBQSxDQUFBLFdBQUEsR0FBQSxJQUFBLENBQUEsVUFBQSxDQUFBLENBQUEsQ0FBQTtBQUNBLFFBQUEsQ0FBQSxVQUFBLENBQUEsR0FBQSxHQUFBLElBQUEsQ0FBQSxRQUFBLENBQUEsYUFBQSxHQUFBLElBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsUUFBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLFFBQUEsQ0FBQSxhQUFBLEdBQUEsSUFBQSxDQUFBLFVBQUEsQ0FBQSxHQUFBLENBQUE7R0FDQTs7ZUFyQ0EsVUFBQTs7V0F1Q0EsZUFBQSxNQUFBLEVBQUE7OztVQUFBLFVBQUEsZ0NBQUEsR0FBQTs7O0FBR0EsVUFBQSxVQUFBLEdBQUEsU0FBQSxVQUFBLENBQUEsSUFBQSxFQUFBO0FBQ0EsYUFBQSxJQUFBLENBQUEsSUFBQSxNQUFBLEtBQUEsRUFBQTtBQUNBLGVBQUEsSUFBQSxDQUFBLElBQUEsTUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUE7QUFDQSxnQkFBQSxJQUFBLEtBQUEsTUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUE7QUFDQSxxQkFBQSxDQUFBLENBQUE7YUFDQTtXQUNBO1NBQ0E7OztBQUdBLGNBQUEsSUFBQSxLQUFBLENBQUEsWUFBQSxHQUFBLElBQUEsR0FBQSxrQ0FBQSxDQUFBLENBQUE7T0FDQSxDQUFBOzs7QUFHQSxVQUFBLE9BQUEsR0FBQSxTQUFBLE9BQUEsQ0FBQSxLQUFBLEVBQUEsSUFBQSxFQUFBO0FBQ0EsWUFBQSxTQUFBLEdBQUEsTUFBQSxVQUFBLENBQUEsVUFBQSxDQUFBLElBQUEsQ0FBQSxDQUFBLENBQUE7O0FBRUEsZUFBQSxLQUFBLEdBQUEsU0FBQSxDQUFBO09BQ0EsQ0FBQTs7O0FBR0EsVUFBQSxVQUFBLEdBQUEsU0FBQSxVQUFBLENBQUEsS0FBQSxFQUFBLElBQUEsRUFBQTtBQUNBLFlBQUEsU0FBQSxHQUFBLE1BQUEsVUFBQSxDQUFBLFVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBOztBQUVBLGVBQUEsS0FBQSxHQUFBLFNBQUEsQ0FBQTtPQUNBLENBQUE7OztBQUdBLFVBQUEsWUFBQSxHQUFBLENBQUEsQ0FBQTs7O0FBR0EsVUFBQSxNQUFBLEdBQUEsTUFBQSxDQUNBLFdBQUEsRUFBQTtPQUNBLE9BQUEsQ0FBQSxhQUFBLEVBQUEsRUFBQSxDQUFBO09BQ0EsS0FBQSxDQUFBLG9CQUFBLENBQUEsQ0FBQTs7QUFFQSxVQUFBLE1BQUEsS0FBQSxJQUFBLEVBQUE7QUFDQSxhQUFBLElBQUEsS0FBQSxJQUFBLE1BQUEsRUFBQTtBQUNBLGNBQUEsQ0FBQSxHQUFBLE1BQUEsQ0FBQSxLQUFBLENBQUEsQ0FBQTtBQUNBLGNBQUEsS0FBQSxHQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsU0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQSxjQUFBLElBQUEsR0FBQSxDQUFBLENBQUEsS0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBOztBQUVBLHNCQUFBLElBQUEsVUFBQSxDQUFBLEtBQUEsRUFBQSxJQUFBLENBQUEsQ0FBQTtTQUNBO09BQ0E7O0FBRUEsYUFBQSxPQUFBLENBQUEsWUFBQSxFQUFBLFVBQUEsQ0FBQSxDQUFBO0tBQ0E7OztTQXpGQSxVQUFBOzs7cUJBQUEsVUFBQTs7QUFBQSxNQUFBLENBQUEsU0FBQSxDQUFBLFNBQUEsR0FBQSxVQUFBLElBQUEsRUFBQSxRQUFBLEVBQUE7QUFDQSxTQUFBLElBQUEsVUFBQSxDQUFBLFFBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxJQUFBLEVBQUEsSUFBQSxDQUFBLENBQUE7Q0FDQSxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVzdHJpbmcge1xuICBjb25zdHJ1Y3Rvciggc2V0dGluZ3MgPSB7fSApIHtcbiAgICBjb25zdCBERUZBVUxUX1NFVFRJTkdTID0ge1xuICAgICAgaG91cnNQZXJEYXk6IDI0LFxuICAgICAgZGF5c1BlcldlZWs6IDcsXG4gICAgICB3ZWVrc1Blck1vbnRoOiA0LFxuICAgICAgbW9udGhzUGVyWWVhcjogMTJcbiAgICB9O1xuXG4gICAgLy8gbWVyZ2UgZGVmYXVsdCBzZXR0aW5ncyB3aXRoIHVzZXIgc2V0dGluZ3NcbiAgICB0aGlzLnNldHRpbmdzID0gREVGQVVMVF9TRVRUSU5HUztcbiAgICBmb3IgKCBsZXQgcyBpbiBzZXR0aW5ncyApIHsgdGhpcy5zZXR0aW5nc1tzXSA9IHNldHRpbmdzW3NdOyB9XG5cbiAgICAvLyB0aW1lIHVuaXRzXG4gICAgdGhpcy51bml0cyA9IHtcbiAgICAgIHM6IFsgXCJzXCIsIFwic2VjXCIsIFwic2Vjc1wiLCBcInNlY29uZFwiLCBcInNlY29uZHNcIiBdLFxuICAgICAgbTogWyBcIm1cIiwgXCJtaW5cIiwgXCJtaW5zXCIsIFwibWludXRlXCIsIFwibWludXRlc1wiIF0sXG4gICAgICBoOiBbIFwiaFwiLCBcImhyXCIsIFwiaHJzXCIsIFwiaG91clwiLCBcImhvdXJzXCIgXSxcbiAgICAgIGQ6IFsgXCJkXCIsIFwiZGF5XCIsIFwiZGF5c1wiIF0sXG4gICAgICB3OiBbIFwid1wiLCBcIndlZWtcIiwgXCJ3ZWVrc1wiIF0sXG4gICAgICBtdGg6IFsgXCJtdGhcIiwgXCJtdGhzXCIsIFwibW9udGhcIiwgXCJtb250aHNcIiBdLFxuICAgICAgeTogWyBcInlcIiwgXCJ5clwiLCBcInlyc1wiLCBcInllYXJcIiwgXCJ5ZWFyc1wiIF1cbiAgICB9O1xuXG4gICAgLy8gdGltZSB1bml0IHNlY29uZHMgbWFwcGluZ3NcbiAgICB0aGlzLnVuaXRWYWx1ZXMgPSB7XG4gICAgICBzOiAxLFxuICAgICAgbTogNjAsXG4gICAgICBoOiAzNjAwXG4gICAgfTtcblxuICAgIC8vIGR5bmFtaWMgdGltZSB1bml0IHNlY29uZHMgbWFwcGluZ3NcbiAgICAvLyB0aGVzZSBhcmUgZHluYW1pYyBiYXNlZCBvbiB0aGUgc2V0dGluZ3NcbiAgICB0aGlzLnVuaXRWYWx1ZXMuZCA9IHRoaXMuc2V0dGluZ3MuaG91cnNQZXJEYXkgKiB0aGlzLnVuaXRWYWx1ZXMuaDtcbiAgICB0aGlzLnVuaXRWYWx1ZXMudyA9IHRoaXMuc2V0dGluZ3MuZGF5c1BlcldlZWsgKiB0aGlzLnVuaXRWYWx1ZXMuZDtcbiAgICB0aGlzLnVuaXRWYWx1ZXMubXRoID0gdGhpcy5zZXR0aW5ncy53ZWVrc1Blck1vbnRoICogdGhpcy51bml0VmFsdWVzLnc7XG4gICAgdGhpcy51bml0VmFsdWVzLnkgPSB0aGlzLnNldHRpbmdzLm1vbnRoc1BlclllYXIgKiB0aGlzLnVuaXRWYWx1ZXMubXRoO1xuICB9XG5cbiAgcGFyc2UoIHN0cmluZywgcmV0dXJuVW5pdCA9IFwic1wiICkge1xuXG4gICAgLy8gZ2V0IHVuaXQga2V5IGhlbHBlclxuICAgIGxldCBnZXRVbml0S2V5ID0gKCB1bml0ICkgPT4ge1xuICAgICAgZm9yICggdmFyIGsgaW4gdGhpcy51bml0cyApIHtcbiAgICAgICAgZm9yICggdmFyIHUgaW4gdGhpcy51bml0c1trXSApIHtcbiAgICAgICAgICBpZiAoIHVuaXQgPT09IHRoaXMudW5pdHNba11bdV0gKSB7XG4gICAgICAgICAgICByZXR1cm4gaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gdGhyb3cgZXJyb3IgaWYgaW52YWxpZCB1bml0IHdhcyBwYXNzZWRcbiAgICAgIHRocm93IG5ldyBFcnJvciggXCJUaGUgdW5pdCBbXCIgKyB1bml0ICsgXCJdIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGltZXN0cmluZ1wiICk7XG4gICAgfTtcblxuICAgIC8vIGNvbnZlcnQgYSB2YWx1ZSB0byBhIHNwZWNpZmljIHVuaXRcbiAgICBsZXQgY29udmVydCA9ICggdmFsdWUsIHVuaXQgKSA9PiB7XG4gICAgICBsZXQgYmFzZVZhbHVlID0gdGhpcy51bml0VmFsdWVzW2dldFVuaXRLZXkoIHVuaXQgKV07XG5cbiAgICAgIHJldHVybiB2YWx1ZSAvIGJhc2VWYWx1ZTtcbiAgICB9O1xuXG4gICAgLy8gZ2V0IGEgdmFsdWUgaW4gc2Vjb25kcyBiYXNlZCBvbiBhIHNwZWNpZmljIHVuaXRcbiAgICBsZXQgZ2V0U2Vjb25kcyA9ICggdmFsdWUsIHVuaXQgKSA9PiB7XG4gICAgICBsZXQgYmFzZVZhbHVlID0gdGhpcy51bml0VmFsdWVzW2dldFVuaXRLZXkoIHVuaXQgKV07XG5cbiAgICAgIHJldHVybiB2YWx1ZSAqIGJhc2VWYWx1ZTtcbiAgICB9O1xuXG4gICAgLy8gc2Vjb25kcyBjb3VudGVyXG4gICAgbGV0IHRvdGFsU2Vjb25kcyA9IDA7XG5cbiAgICAvLyBzcGxpdCBzdHJpbmcgaW50byBncm91cHMgYW5kIGdldCB0b3RhbCBzZWNvbmRzIGZvciBlYWNoIGdyb3VwXG4gICAgbGV0IGdyb3VwcyA9IHN0cmluZ1xuICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkgLy8gY29udmVydCB3b3JkcyB0byBsb3dlciBjYXNlXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSggL1teXFwuXFx3Ky1dKy9nLCBcIlwiICkgLy8gcmVtb3ZlIHdoaXRlIHNwYWNlXG4gICAgICAgICAgICAgICAgICAubWF0Y2goIC9bLStdP1swLTldK1thLXpdKy9nICk7IC8vIG1hdGNoIHRpbWUgZ3JvdXBzIChkaWdpdCBmb2xsb3dlZCBieSB0aW1lIHVuaXQgLSBpLmUgNWQgMTVtID0gMiB0aW1lIGdyb3VwcylcblxuICAgIGlmICggZ3JvdXBzICE9PSBudWxsICkge1xuICAgICAgZm9yICggbGV0IGdyb3VwIGluIGdyb3VwcyApIHtcbiAgICAgICAgbGV0IGcgPSBncm91cHNbZ3JvdXBdO1xuICAgICAgICBsZXQgdmFsdWUgPSBnLm1hdGNoKCAvWzAtOV0rL2cgKVswXTtcbiAgICAgICAgbGV0IHVuaXQgPSBnLm1hdGNoKCAvW2Etel0rL2cgKVswXTtcblxuICAgICAgICB0b3RhbFNlY29uZHMgKz0gZ2V0U2Vjb25kcyggdmFsdWUsIHVuaXQgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29udmVydCggdG90YWxTZWNvbmRzLCByZXR1cm5Vbml0ICk7XG4gIH1cbn1cbiJdfQ==
