String.prototype.parseTime = function( unit, settings ) {
  return ( new Timestring( settings ) ).parse( this, unit );
};
