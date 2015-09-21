
var gutil = require('gulp-util');

var log = gutil.log;

log.colors = gutil.colors;

module.exports = function( tag, message ) {
  var JSONmessage = typeof message == 'object' ? JSON.stringify(message,null,4) : message;
  log( log.colors.green('[ '+tag+' ]'), log.colors.blue(JSONmessage) );
};
