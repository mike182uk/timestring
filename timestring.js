(function(){

    "use strict";

    var Timestring = function(settings) {
        // default settings
        var defaults = {
            hoursPerDay: 24,
            daysPerWeek: 7,
            weeksPerMonth: 4,
            monthsPerYear: 12
        };

        // merge default settings with user settings
        var settings = settings || {};
        this.settings = {};
        for (var property in defaults) { this.settings[property] = defaults[property]; }
        for (var property in settings) { this.settings[property] = settings[property]; }

        // time units
        this.units = {
            s: ['s', 'sec', 'secs', 'second', 'seconds'],
            m: ['m', 'min', 'mins', 'minute', 'minutes'],
            h: ['h', 'hr', 'hrs', 'hour', 'hours'],
            d: ['d', 'day', 'days'],
            w: ['w', 'week', 'weeks'],
            mth: ['mth', 'mths','month', 'months'],
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
        this.unitValues.y = this.settings.monthsPerYear * this.unitValues.w;
    };

    Timestring.prototype.parse = function(string, returnUnit) {
        // reference to this
        var self = this;

        // convert a value to a specific unit
        function convert(value, unit) {
            var baseValue = self.unitValues[unit];
            return value / baseValue;
        }

        // get a value in seconds based on a specific unit
        function getSeconds(value, unit) {
            var baseValue = self.unitValues[unit];
            return value * baseValue;
        }

        // seconds counter
        var totalSeconds = 0;

        // split string into groups and get total seconds for each group
        var groups = string
                        .replace(/[^\w+-]+/g, '') // remove white space
                        .match(/[-+]?[0-9]+[a-z]+/g); // match time groups (digit followed by time unit - i.e 5d 15m = 2 time groups)

        if (groups !== null) {
            for(var group in groups) {
                var g = groups[group],
                    value = g.match(/[0-9]+/g),
                    unit = g.match(/[a-z]+/g);

                totalSeconds += getSeconds(value, unit);
            }
        }

        // return total, convert if needed
        return (returnUnit) ? convert(totalSeconds, returnUnit) : totalSeconds;
    }

    // add convenience method to string proto
    String.prototype.parseTime = function (unit, settings) {
        return (new Timestring(settings)).parse(this, unit);
    }

    // export Timestring object for either the browser or node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Timestring;
    }
    else {
        this.Timestring = Timestring;
    }

}).call(this);
