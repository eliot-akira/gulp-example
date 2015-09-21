
var del = require('del');
var log = require('../../util/log');
var path = require('path');

module.exports = function runCleanJS( options ) {

  var files;
  var compiled = path.join(options.dest, options.slug+'.js');
  var minified = path.join(options.dest, options.slug+options.minExtension);

  if (compiled==minified) files = [minified];
  else files = [compiled, minified];

  del(files)
    .then( function(){
      log( 'JS', 'Removed previous bundle: '+compiled+' and '+minified);
    });
};
