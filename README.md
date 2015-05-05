#Timestring

[![Build Status](https://img.shields.io/travis/mike182uk/timestring.svg?style=flat-square)](http://travis-ci.org/mike182uk/timestring)
[![Coveralls](https://img.shields.io/coveralls/mike182uk/timestring/master.svg?style=flat-square)](https://coveralls.io/r/mike182uk/timestring)
[![npm](https://img.shields.io/npm/dm/timestring.svg?style=flat-square)](https://www.npmjs.com/package/timestring)
[![License](https://img.shields.io/github/license/mike182uk/timestring.svg?style=flat-square)](https://www.npmjs.com/package/timestring)

Parse a human readable time string into a time based value.

##Overview

```js
var str = '1h 15m';
var time = str.parseTime();

console.log(time); // will log 4500
```

In the example above `str` is just a plain old `String` object. A new method is added to the `String` objects prototype named `parseTime`. This method parses the string and returns a time based value.

**By default the returned time value will be in seconds.**

The time string can contain as many time groups as needed:

```js
var str = '1d 3h 25m 18s';
var time = str.parseTime();

console.log(time); // will log 98718
```

and can be as messy as you like:

```js
var str = '1 d    3HOurS 25              min         1   8s';
var time = str.parseTime();

console.log(time); // will log 98718
```

As well as using the `String` objects `parseTime` method you can create a `Timestring` object and parse the string manually:

```js
var str = '1h 15m';
var time = (new Timestring()).parse(str);

console.log(time); // will log 4500
```

##Keywords

Timestring will parse the following keywords into time values:

1. `s, sec, secs, second, seconds` - will parse to seconds
2. `m, min, mins, minute, minutes` - will parse to minutes
3. `h, hr, hrs, hour, hours` - will parse to hours
4. `d, day, days` - will parse to days
5. `w, week, weeks` - will parse to weeks
6. `mth, mths, month, months` - will parse to months
7. `y, yr, yrs, year, years` - will parse to years

Keywords can be used interchangeably:

```js
var str = '1day 15h 20minutes 15s';
var time = str.parseTime();

console.log(time); // will log 141615
```

##Return Time Value

By default the return time value will be in seconds. This can be changed by passing one of the following strings as an argument to `String.parseTime` or `Timestring.parse`:

1. `s` - Seconds
2. `m` - Minutes
3. `h` - Hours
4. `d` - Days
5. `w` - Weeks
6. `mth` - Months
7. `y` - Years

```js
var str = '22h 16m';

var hours = str.parseTime('h'); // 22.266666666666666
var days = str.parseTime('d'); // 0.9277777777777778
var weeks = str.parseTime('w'); // 0.13253968253968254

// or

var hours = (new Timestring()).parse(str, 'h'); // 22.266666666666666
var days = (new Timestring()).parse(str, 'd'); // 0.9277777777777778
var weeks = (new Timestring()).parse(str, 'w'); // 0.13253968253968254
```

##Optional Configuration

A few assumptions are made by default:

1. There are 24 hours per day
2. There are 7 days per week
3. There are 4 weeks per month
4. There are 12 months per year

These settings can be changed by passing a settings object as an argument to `String.parseTime` or to the `Timestring` objects constructor.

The following settings are configurable:

1. `hoursPerDay`
2. `daysPerWeek`
3. `weeksPerMonth`
4. `monthsPerYear`

```js
var str = '1d';

var settings = {
	hoursPerDay: 1
}

var time = str.parseTime('h', settings);

// or

var time = (new Timestring(settings)).parse(str, 'h');


console.log(time); // will log 1
```

In the example above `hoursPerDay` is being set to `1`. When the time string is being parsed, the return value is being specified as hours. Normally `1d` would parse to `24` hours (as by deafult there are 24 hours in a day) but because `hoursPerDay` has been set to `1`, `1d` will now only parse to `1` hour.

This would be useful for specific application needs.

*Example  - Employees of my company work 7.5 hours a day, and only work 5 days a week. In my time tracking app, when they type `1d` i want 7.5 hours to be tracked. When they type `1w` i want 5 days to be tracked etc.*

```js
var settings = {
	hoursPerDay: 7.5,
	daysPerWeek: 5
}

// get time values from form input
var today = document.querySelector('time-input').value,  // '1d'
	thisWeek = document.querySelector('time-input').value; // '1w'

// parse times
var hoursToday = today.parseTime('h', settings),
	daysThisWeek = thisWeek.parseTime('d', settings);

// or

var hoursToday = (new Timestring(settings)).parse(today, 'h'),
	daysThisWeek = (new Timestring(settings)).parse(thisWeek, 'd');


console.log(hoursToday); // will log 7.5
console.log(daysThisWeek); // will log 5
```

##Installation

###Browser

All you need to do to get timestring working in the browser is download / clone this repo and make sure you include the `dist/timestring.min.js` script on your page:

```html
<script src="<path-to-src>/dist/timestring.min.js"></script>
```

Alternatively you can you use bower to manage this dependency for you:

```bash
bower install timestring --save
```

###Node

To install for a node application, navigate to the projects root folder and in your terminal type the following:

```bash
npm install timestring --save
```

In your node application you need to require the timestring module:

```js
var Timestring = require('timestring');
```
