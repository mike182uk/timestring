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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRpbWVzdHJpbmcuanMiLCJTdHJpbmcucGFyc2VUaW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBQSxVQUFBO0FBQ0EsV0FEQSxVQUFBLEdBQ0E7UUFBQSxRQUFBLGdDQUFBLEVBQUE7OzBCQURBLFVBQUE7O0FBRUEsUUFBQSxnQkFBQSxHQUFBO0FBQ0EsaUJBQUEsRUFBQSxFQUFBO0FBQ0EsaUJBQUEsRUFBQSxDQUFBO0FBQ0EsbUJBQUEsRUFBQSxDQUFBO0FBQ0EsbUJBQUEsRUFBQSxFQUFBO0tBQ0EsQ0FBQTs7O0FBR0EsUUFBQSxDQUFBLFFBQUEsR0FBQSxnQkFBQSxDQUFBO0FBQ0EsU0FBQSxJQUFBLENBQUEsSUFBQSxRQUFBLEVBQUE7QUFBQSxVQUFBLENBQUEsUUFBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLFFBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTtLQUFBOzs7QUFHQSxRQUFBLENBQUEsS0FBQSxHQUFBO0FBQ0EsT0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQSxNQUFBLEVBQUEsUUFBQSxFQUFBLFNBQUEsQ0FBQTtBQUNBLE9BQUEsRUFBQSxDQUFBLEdBQUEsRUFBQSxLQUFBLEVBQUEsTUFBQSxFQUFBLFFBQUEsRUFBQSxTQUFBLENBQUE7QUFDQSxPQUFBLEVBQUEsQ0FBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLEtBQUEsRUFBQSxNQUFBLEVBQUEsT0FBQSxDQUFBO0FBQ0EsT0FBQSxFQUFBLENBQUEsR0FBQSxFQUFBLEtBQUEsRUFBQSxNQUFBLENBQUE7QUFDQSxPQUFBLEVBQUEsQ0FBQSxHQUFBLEVBQUEsTUFBQSxFQUFBLE9BQUEsQ0FBQTtBQUNBLFNBQUEsRUFBQSxDQUFBLEtBQUEsRUFBQSxNQUFBLEVBQUEsT0FBQSxFQUFBLFFBQUEsQ0FBQTtBQUNBLE9BQUEsRUFBQSxDQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLENBQUE7S0FDQSxDQUFBOzs7QUFHQSxRQUFBLENBQUEsVUFBQSxHQUFBO0FBQ0EsT0FBQSxFQUFBLENBQUE7QUFDQSxPQUFBLEVBQUEsRUFBQTtBQUNBLE9BQUEsRUFBQSxJQUFBO0tBQ0EsQ0FBQTs7OztBQUlBLFFBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxRQUFBLENBQUEsV0FBQSxHQUFBLElBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsUUFBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLEdBQUEsSUFBQSxDQUFBLFFBQUEsQ0FBQSxXQUFBLEdBQUEsSUFBQSxDQUFBLFVBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQSxRQUFBLENBQUEsVUFBQSxDQUFBLEdBQUEsR0FBQSxJQUFBLENBQUEsUUFBQSxDQUFBLGFBQUEsR0FBQSxJQUFBLENBQUEsVUFBQSxDQUFBLENBQUEsQ0FBQTtBQUNBLFFBQUEsQ0FBQSxVQUFBLENBQUEsQ0FBQSxHQUFBLElBQUEsQ0FBQSxRQUFBLENBQUEsYUFBQSxHQUFBLElBQUEsQ0FBQSxVQUFBLENBQUEsR0FBQSxDQUFBO0dBQ0E7O2VBckNBLFVBQUE7O1dBdUNBLGVBQUEsTUFBQSxFQUFBOzs7VUFBQSxVQUFBLGdDQUFBLEdBQUE7OztBQUdBLFVBQUEsVUFBQSxHQUFBLFNBQUEsVUFBQSxDQUFBLElBQUEsRUFBQTtBQUNBLGFBQUEsSUFBQSxDQUFBLElBQUEsTUFBQSxLQUFBLEVBQUE7QUFDQSxlQUFBLElBQUEsQ0FBQSxJQUFBLE1BQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBO0FBQ0EsZ0JBQUEsSUFBQSxLQUFBLE1BQUEsS0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBO0FBQ0EscUJBQUEsQ0FBQSxDQUFBO2FBQ0E7V0FDQTtTQUNBOzs7QUFHQSxjQUFBLElBQUEsS0FBQSxDQUFBLFlBQUEsR0FBQSxJQUFBLEdBQUEsa0NBQUEsQ0FBQSxDQUFBO09BQ0EsQ0FBQTs7O0FBR0EsVUFBQSxPQUFBLEdBQUEsU0FBQSxPQUFBLENBQUEsS0FBQSxFQUFBLElBQUEsRUFBQTtBQUNBLFlBQUEsU0FBQSxHQUFBLE1BQUEsVUFBQSxDQUFBLFVBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBOztBQUVBLGVBQUEsS0FBQSxHQUFBLFNBQUEsQ0FBQTtPQUNBLENBQUE7OztBQUdBLFVBQUEsVUFBQSxHQUFBLFNBQUEsVUFBQSxDQUFBLEtBQUEsRUFBQSxJQUFBLEVBQUE7QUFDQSxZQUFBLFNBQUEsR0FBQSxNQUFBLFVBQUEsQ0FBQSxVQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQTs7QUFFQSxlQUFBLEtBQUEsR0FBQSxTQUFBLENBQUE7T0FDQSxDQUFBOzs7QUFHQSxVQUFBLFlBQUEsR0FBQSxDQUFBLENBQUE7OztBQUdBLFVBQUEsTUFBQSxHQUFBLE1BQUEsQ0FDQSxXQUFBLEVBQUE7T0FDQSxPQUFBLENBQUEsYUFBQSxFQUFBLEVBQUEsQ0FBQTtPQUNBLEtBQUEsQ0FBQSxvQkFBQSxDQUFBLENBQUE7O0FBRUEsVUFBQSxNQUFBLEtBQUEsSUFBQSxFQUFBO0FBQ0EsYUFBQSxJQUFBLEtBQUEsSUFBQSxNQUFBLEVBQUE7QUFDQSxjQUFBLENBQUEsR0FBQSxNQUFBLENBQUEsS0FBQSxDQUFBLENBQUE7QUFDQSxjQUFBLEtBQUEsR0FBQSxDQUFBLENBQUEsS0FBQSxDQUFBLFNBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsY0FBQSxJQUFBLEdBQUEsQ0FBQSxDQUFBLEtBQUEsQ0FBQSxTQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQTs7QUFFQSxzQkFBQSxJQUFBLFVBQUEsQ0FBQSxLQUFBLEVBQUEsSUFBQSxDQUFBLENBQUE7U0FDQTtPQUNBOztBQUVBLGFBQUEsT0FBQSxDQUFBLFlBQUEsRUFBQSxVQUFBLENBQUEsQ0FBQTtLQUNBOzs7U0F6RkEsVUFBQTs7O3FCQUFBLFVBQUE7O0FDQUEsTUFBQSxDQUFBLFNBQUEsQ0FBQSxTQUFBLEdBQUEsVUFBQSxJQUFBLEVBQUEsUUFBQSxFQUFBO0FBQ0EsU0FBQSxJQUFBLFVBQUEsQ0FBQSxRQUFBLENBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFBLElBQUEsQ0FBQSxDQUFBO0NBQ0EsQ0FBQSIsImZpbGUiOiJ0aW1lc3RyaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZXN0cmluZyB7XG4gIGNvbnN0cnVjdG9yKCBzZXR0aW5ncyA9IHt9ICkge1xuICAgIGNvbnN0IERFRkFVTFRfU0VUVElOR1MgPSB7XG4gICAgICBob3Vyc1BlckRheTogMjQsXG4gICAgICBkYXlzUGVyV2VlazogNyxcbiAgICAgIHdlZWtzUGVyTW9udGg6IDQsXG4gICAgICBtb250aHNQZXJZZWFyOiAxMlxuICAgIH07XG5cbiAgICAvLyBtZXJnZSBkZWZhdWx0IHNldHRpbmdzIHdpdGggdXNlciBzZXR0aW5nc1xuICAgIHRoaXMuc2V0dGluZ3MgPSBERUZBVUxUX1NFVFRJTkdTO1xuICAgIGZvciAoIGxldCBzIGluIHNldHRpbmdzICkgeyB0aGlzLnNldHRpbmdzW3NdID0gc2V0dGluZ3Nbc107IH1cblxuICAgIC8vIHRpbWUgdW5pdHNcbiAgICB0aGlzLnVuaXRzID0ge1xuICAgICAgczogWyBcInNcIiwgXCJzZWNcIiwgXCJzZWNzXCIsIFwic2Vjb25kXCIsIFwic2Vjb25kc1wiIF0sXG4gICAgICBtOiBbIFwibVwiLCBcIm1pblwiLCBcIm1pbnNcIiwgXCJtaW51dGVcIiwgXCJtaW51dGVzXCIgXSxcbiAgICAgIGg6IFsgXCJoXCIsIFwiaHJcIiwgXCJocnNcIiwgXCJob3VyXCIsIFwiaG91cnNcIiBdLFxuICAgICAgZDogWyBcImRcIiwgXCJkYXlcIiwgXCJkYXlzXCIgXSxcbiAgICAgIHc6IFsgXCJ3XCIsIFwid2Vla1wiLCBcIndlZWtzXCIgXSxcbiAgICAgIG10aDogWyBcIm10aFwiLCBcIm10aHNcIiwgXCJtb250aFwiLCBcIm1vbnRoc1wiIF0sXG4gICAgICB5OiBbIFwieVwiLCBcInlyXCIsIFwieXJzXCIsIFwieWVhclwiLCBcInllYXJzXCIgXVxuICAgIH07XG5cbiAgICAvLyB0aW1lIHVuaXQgc2Vjb25kcyBtYXBwaW5nc1xuICAgIHRoaXMudW5pdFZhbHVlcyA9IHtcbiAgICAgIHM6IDEsXG4gICAgICBtOiA2MCxcbiAgICAgIGg6IDM2MDBcbiAgICB9O1xuXG4gICAgLy8gZHluYW1pYyB0aW1lIHVuaXQgc2Vjb25kcyBtYXBwaW5nc1xuICAgIC8vIHRoZXNlIGFyZSBkeW5hbWljIGJhc2VkIG9uIHRoZSBzZXR0aW5nc1xuICAgIHRoaXMudW5pdFZhbHVlcy5kID0gdGhpcy5zZXR0aW5ncy5ob3Vyc1BlckRheSAqIHRoaXMudW5pdFZhbHVlcy5oO1xuICAgIHRoaXMudW5pdFZhbHVlcy53ID0gdGhpcy5zZXR0aW5ncy5kYXlzUGVyV2VlayAqIHRoaXMudW5pdFZhbHVlcy5kO1xuICAgIHRoaXMudW5pdFZhbHVlcy5tdGggPSB0aGlzLnNldHRpbmdzLndlZWtzUGVyTW9udGggKiB0aGlzLnVuaXRWYWx1ZXMudztcbiAgICB0aGlzLnVuaXRWYWx1ZXMueSA9IHRoaXMuc2V0dGluZ3MubW9udGhzUGVyWWVhciAqIHRoaXMudW5pdFZhbHVlcy5tdGg7XG4gIH1cblxuICBwYXJzZSggc3RyaW5nLCByZXR1cm5Vbml0ID0gXCJzXCIgKSB7XG5cbiAgICAvLyBnZXQgdW5pdCBrZXkgaGVscGVyXG4gICAgbGV0IGdldFVuaXRLZXkgPSAoIHVuaXQgKSA9PiB7XG4gICAgICBmb3IgKCB2YXIgayBpbiB0aGlzLnVuaXRzICkge1xuICAgICAgICBmb3IgKCB2YXIgdSBpbiB0aGlzLnVuaXRzW2tdICkge1xuICAgICAgICAgIGlmICggdW5pdCA9PT0gdGhpcy51bml0c1trXVt1XSApIHtcbiAgICAgICAgICAgIHJldHVybiBrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB0aHJvdyBlcnJvciBpZiBpbnZhbGlkIHVuaXQgd2FzIHBhc3NlZFxuICAgICAgdGhyb3cgbmV3IEVycm9yKCBcIlRoZSB1bml0IFtcIiArIHVuaXQgKyBcIl0gaXMgbm90IHN1cHBvcnRlZCBieSB0aW1lc3RyaW5nXCIgKTtcbiAgICB9O1xuXG4gICAgLy8gY29udmVydCBhIHZhbHVlIHRvIGEgc3BlY2lmaWMgdW5pdFxuICAgIGxldCBjb252ZXJ0ID0gKCB2YWx1ZSwgdW5pdCApID0+IHtcbiAgICAgIGxldCBiYXNlVmFsdWUgPSB0aGlzLnVuaXRWYWx1ZXNbZ2V0VW5pdEtleSggdW5pdCApXTtcblxuICAgICAgcmV0dXJuIHZhbHVlIC8gYmFzZVZhbHVlO1xuICAgIH07XG5cbiAgICAvLyBnZXQgYSB2YWx1ZSBpbiBzZWNvbmRzIGJhc2VkIG9uIGEgc3BlY2lmaWMgdW5pdFxuICAgIGxldCBnZXRTZWNvbmRzID0gKCB2YWx1ZSwgdW5pdCApID0+IHtcbiAgICAgIGxldCBiYXNlVmFsdWUgPSB0aGlzLnVuaXRWYWx1ZXNbZ2V0VW5pdEtleSggdW5pdCApXTtcblxuICAgICAgcmV0dXJuIHZhbHVlICogYmFzZVZhbHVlO1xuICAgIH07XG5cbiAgICAvLyBzZWNvbmRzIGNvdW50ZXJcbiAgICBsZXQgdG90YWxTZWNvbmRzID0gMDtcblxuICAgIC8vIHNwbGl0IHN0cmluZyBpbnRvIGdyb3VwcyBhbmQgZ2V0IHRvdGFsIHNlY29uZHMgZm9yIGVhY2ggZ3JvdXBcbiAgICBsZXQgZ3JvdXBzID0gc3RyaW5nXG4gICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSAvLyBjb252ZXJ0IHdvcmRzIHRvIGxvd2VyIGNhc2VcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKCAvW15cXC5cXHcrLV0rL2csIFwiXCIgKSAvLyByZW1vdmUgd2hpdGUgc3BhY2VcbiAgICAgICAgICAgICAgICAgIC5tYXRjaCggL1stK10/WzAtOV0rW2Etel0rL2cgKTsgLy8gbWF0Y2ggdGltZSBncm91cHMgKGRpZ2l0IGZvbGxvd2VkIGJ5IHRpbWUgdW5pdCAtIGkuZSA1ZCAxNW0gPSAyIHRpbWUgZ3JvdXBzKVxuXG4gICAgaWYgKCBncm91cHMgIT09IG51bGwgKSB7XG4gICAgICBmb3IgKCBsZXQgZ3JvdXAgaW4gZ3JvdXBzICkge1xuICAgICAgICBsZXQgZyA9IGdyb3Vwc1tncm91cF07XG4gICAgICAgIGxldCB2YWx1ZSA9IGcubWF0Y2goIC9bMC05XSsvZyApWzBdO1xuICAgICAgICBsZXQgdW5pdCA9IGcubWF0Y2goIC9bYS16XSsvZyApWzBdO1xuXG4gICAgICAgIHRvdGFsU2Vjb25kcyArPSBnZXRTZWNvbmRzKCB2YWx1ZSwgdW5pdCApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb252ZXJ0KCB0b3RhbFNlY29uZHMsIHJldHVyblVuaXQgKTtcbiAgfVxufVxuIiwiU3RyaW5nLnByb3RvdHlwZS5wYXJzZVRpbWUgPSBmdW5jdGlvbiggdW5pdCwgc2V0dGluZ3MgKSB7XG4gIHJldHVybiAoIG5ldyBUaW1lc3RyaW5nKCBzZXR0aW5ncyApICkucGFyc2UoIHRoaXMsIHVuaXQgKTtcbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=