
var del = require('del');
var log = require('../../util/log');

module.exports = function runCleanJS( options ) {

  if ( ! options.clean ) return;

  del( [ options.dest+options.slug+'.js', options.dest+options.slug+'.min.js' ] )
    .then( function(){
      log( 'JS', 'Removed previous bundle: '+options.dest+options.slug+'.js and '+
        options.dest+options.slug+'.min.js');
    });
};
