
var del = require('del');
var log = require('../../util/log');
var path = require('path');

module.exports = function runCleanJS( options ) {

  if ( ! options.clean ) return;

  var compiled = path.join(options.dest, options.slug+'.js');
  var minified = path.join(options.dest, options.slug+'.min.js');

  del([compiled, minified])
    .then( function(){
      log( 'JS', 'Removed previous bundle: '+compiled+' and '+minified);
    });
};
