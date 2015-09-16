
module.exports = {

  value: function(target, defaultVal ) {

    target = typeof target !== 'undefined' ? target : defaultVal;
    return target;
  },

  props: function( target, defaultVals ) {

    target = typeof target === 'object' ? target : {};

    for (var key in defaultVals) {
      if (defaultVals.hasOwnProperty(key)) {
        target[ key ] = target[ key ] || defaultVals[ key ];
      }
    }
    return target;
  },

  array: function( target, defaultArray ) {

    if ( target ) {
      target = Array.isArray( target ) ? target : [ target ];
    } else {
      target = Array.isArray( defaultArray ) ? defaultArray : [ defaultArray ];
    }
    return target;
  },

  booleanArray: function( target, defaultBoolean, defaultArray ) {

    target = typeof target !== 'undefined' ? target : defaultBoolean;

    if ( target ) {
      if ( typeof target === 'boolean' ) {
        target = Array.isArray( defaultArray ) ? defaultArray : [ defaultArray ];
      } else {
        target = Array.isArray( target ) ? target : [ target ];
      }
    }
    return target;
  },

  booleanObject: function( target, defaultBoolean, defaultObject ) {

    target = typeof target !== 'undefined' ? target : defaultBoolean;

    if ( target ) {
      if ( typeof target === 'boolean' ) {
        target = defaultObject;
      } else {
        target = this.props( target, defaultObject );
      }
    }
    return target;
  }

};
