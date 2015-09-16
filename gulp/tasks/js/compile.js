
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var log = require('../../util/log');
var path = require('path');
var setDefault = require('../../util/set-default.js');

var browserify = require('browserify');

  // Browserify -> gulp stream
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


module.exports = function runCompileJS( options, dev ) {

  dev = typeof dev !== 'undefined' ? dev : false;

  var entry = path.join(options.src, options.entry+options.extension);

  var bundle = browserify( setDefault.props( options.browserify, {
    entries: entry,
    debug: dev // Sourcemap
    // cache: {}, packageCache: {},
    // fullPaths: true,
    // extensions: options.extension,
    // paths: ['./node_modules', options.src]
  }));

  if ( options.babel ) {

    var babelify = require('babelify');

    bundle = bundle.transform( babelify.configure( options.babelOptions || {} ) );

  } else if ( options.coffee ) {
    bundle = bundle.transform( 'coffeeify' );
  }

  bundle = bundle.bundle();

  if ( dev ) bundle = bundle.on('error', function(err){ // Prevent error from stopping watch
    console.log(err.message);
    this.emit("end"); // Keep stream going
  });

  bundle = bundle
    .pipe( source( options.slug+'.js' ) )
    .pipe( buffer() ) // Browserify -> gulp stream
    .pipe( gulp.dest( options.dest ) )
    .on('end', function(){
      log( 'Browserify', 'Compiled with'+(dev?'':'out')+' sourcemap: from '+
        entry+' to '+path.join(options.dest, options.slug+'.js'));
    });

  return bundle;
};
