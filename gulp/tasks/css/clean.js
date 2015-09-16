
var del = require('del');
var log = require('../../util/log');

module.exports = function runCleanCSS( options ) {
  del( [ options.dest+options.slug+'.css', options.dest+options.slug+'.min.css' ] )
    .then( function(){
      log( 'CSS', 'Removed previous bundle: '+options.dest+options.slug+'.css and '+
        options.dest+options.slug+'.min.css');
    });
};
