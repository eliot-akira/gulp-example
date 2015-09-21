
var del = require('del');
var log = require('../../util/log');
var path = require('path');

module.exports = function runCleanCSS( options ) {

  var files;
  var compiled = path.join(options.dest, options.slug+'.css');
  var minified = path.join(options.dest, options.slug+options.minExtension);

  if (compiled==minified) files = [minified];
  else files = [compiled, minified];

  del(files)
    .then( function(){
      log( 'CSS', 'Removed previous bundle: '+compiled+' and '+minified);
    });
};
