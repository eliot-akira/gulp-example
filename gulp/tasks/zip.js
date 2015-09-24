
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var log = require('../util/log');


module.exports = function zipTasks( config ) {

  for (var asset of config.assets) {

    if ( ! asset.zip ) continue;

    gulp.task('zip-'+asset.zip.slug, function() {
      return runZip( asset.zip.slug, asset.zip.src, asset.zip.dest, asset.zip.files );
    });
  }
};


function runZip( slug, src, dest, files ) {

  return gulp.src( files, {
    base : '../' // Important
  })
    .pipe( plugins.zip( slug+'.zip' ) )
    .pipe( gulp.dest( dest ) )
    .on('end', function(){ log( 'Zip', 'Zipped from '+src+' to '+dest+slug+'.zip') });
};
