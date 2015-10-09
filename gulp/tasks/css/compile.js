
var gulp = require('gulp');
var gulpif = require('gulp-if');
var plugins = require('gulp-load-plugins')();
var log = require('../../util/log');
var path = require('path');

module.exports = function runCompileCSS( options, dev ) {

  dev = (typeof dev !== 'undefined') ? dev : false;

  var entry = path.join(options.src, options.entry+options.extension);
  var logTag = options.sass ? 'Sass' : 'CSS';

  var stream = gulp.src( entry )

    .pipe(plugins.plumber())

    .pipe( gulpif( dev, plugins.sourcemaps.init({}) ) )

    .pipe( gulpif( options.sass, plugins.sass( options.sass ).on('error', plugins.sass.logError) ) )

    .pipe( gulpif( options.autoprefix, plugins.autoprefixer( options.autoprefix ) ) )

    .pipe( plugins.rename( options.slug+'.css' ) )

    .pipe( gulpif( dev, plugins.sourcemaps.write() ) )

    .pipe( gulp.dest( options.dest ) )

    .on('end', function() {
      log( logTag, 'Compiled with'+(dev?'':'out')+' source map from '+
        entry+' to '+path.join(options.dest, options.slug+'.css'));
    });

  return stream;
};
