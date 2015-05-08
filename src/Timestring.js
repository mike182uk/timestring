export default class Timestring {
  constructor( settings = {} ) {
    const DEFAULT_SETTINGS = {
      hoursPerDay: 24,
      daysPerWeek: 7,
      weeksPerMonth: 4,
      monthsPerYear: 12
    };

    // merge default settings with user settings
    this.settings = DEFAULT_SETTINGS;
    for ( let s in settings ) { this.settings[s] = settings[s]; }

    // time units
    this.units = {
      s: [ "s", "sec", "secs", "second", "seconds" ],
      m: [ "m", "min", "mins", "minute", "minutes" ],
      h: [ "h", "hr", "hrs", "hour", "hours" ],
      d: [ "d", "day", "days" ],
      w: [ "w", "week", "weeks" ],
      mth: [ "mth", "mths", "month", "months" ],
      y: [ "y", "yr", "yrs", "year", "years" ]
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

  parse( string, returnUnit = "s" ) {

    // get unit key helper
    let getUnitKey = ( unit ) => {
      for ( var k in this.units ) {
        for ( var u in this.units[k] ) {
          if ( unit === this.units[k][u] ) {
            return k;
          }
        }
      }

      // throw error if invalid unit was passed
      throw new Error( `The unit ${unit} is not supported by timestring` );
    };

    // convert a value to a specific unit
    let convert = ( value, unit ) => {
      let baseValue = this.unitValues[getUnitKey( unit )];

      return value / baseValue;
    };

    // get a value in seconds based on a specific unit
    let getSeconds = ( value, unit ) => {
      let baseValue = this.unitValues[getUnitKey( unit )];

      return value * baseValue;
    };

    // seconds counter
    let totalSeconds = 0;

    // split string into groups and get total seconds for each group
    let groups = string
                  .toLowerCase() // convert words to lower case
                  .replace( /[^\.\w+-]+/g, "" ) // remove white space
                  .match( /[-+]?[0-9]+[a-z]+/g ); // match time groups (digit followed by time unit - i.e 5d 15m = 2 time groups)

    if ( groups !== null ) {
      for ( let group in groups ) {
        let g = groups[group];
        let value = g.match( /[0-9]+/g )[0];
        let unit = g.match( /[a-z]+/g )[0];

        totalSeconds += getSeconds( value, unit );
      }
    }

    return convert( totalSeconds, returnUnit );
  }
}
