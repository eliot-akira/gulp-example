
var del = require('del');
var log = require('../../util/log');
var path = require('path');

module.exports = function runCleanCSS( options ) {

  var compiled = path.join(options.dest, options.slug+'.css');
  var minified = path.join(options.dest, options.slug+'.min.css');

  del([compiled, minified])
    .then( function(){
      log( 'CSS', 'Removed previous bundle: '+compiled+' and '+minified);
    });
};
