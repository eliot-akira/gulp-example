
var gutil = require('gulp-util');

var log = gutil.log;

log.colors = gutil.colors;

module.exports = function( tag, message ) {
  var args = Array.prototype.slice.call(arguments, 0);
  var i = 0;
  var pass = [];

  args.forEach(function(arg) {
    if ( i === 0 ) arg = log.colors.green('[ '+arg+' ]');
    else {
      arg = typeof arg == 'object' ? '\n'+JSON.stringify(arg,null,4)+'\n' : arg;
      if ( i === 1 ) arg = log.colors.blue( arg );
    }
    pass.push( arg );
    i++;
  });
  log.apply(this, pass);
};
