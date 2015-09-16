
var gutil = require('gulp-util');

var log = gutil.log;

log.colors = gutil.colors;

module.exports = function( tag, message ) {
  log( log.colors.green('[ '+tag+' ]'), log.colors.blue(message) )
};
