# Changelog

## 3.2.0

- Added `mon` unit ([@IanMitchell](https://github.com/IanMitchell))

## 3.1.0

- Added `ms` unit ([@mrbar42](https://github.com/mrbar42))

## 3.0.0

- Remove `String.parseTime`
- Export function instead of object

## 2.0.0

- Keep it simple: revert back to ES5, remove gulp, browserify and build steps
- Remove bower / browser specific integrations - This module can still be used client side using modern development tools like webpack, browserify etc.
- use `node-style-guide` coding style

## 1.1.1

- src now uses ES6
- use gulp instead of grunt
- setup gulp build pipeline
- use analysis tools: JSCS, jshint
- use consistent coding style (jQuery coding style)
- send code coverage to coveralls.io
- use browserify to generate distributable scripts
- add contributing doc
- misc meta data updates
- add sourcemaps

## 1.1.0

- add MIT license
- add Changelog
- add Grunt config
- add editorconfig
- add Tests
- fix JSHint errors
- format code as per editorconfig
- fix bug with conversion from year(s) to another unit
- make sure `Error` (type) is thrown when invalid unit is encountered
- add minified distributable version
- update package.json
- add bower config
- add travis config
