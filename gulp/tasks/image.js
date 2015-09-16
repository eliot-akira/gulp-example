
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    log = require('../util/log');


module.exports = function imageTasks( config ) {

  for (var asset of config.assets) {

    if ( asset.image ) {

      gulp.task('image-min-'+asset.slug, function() {
        return runImageMin( asset.image.source, asset.image.dest, asset.image.files );
      });
    }
  }
};

function runImageMin( src, dest, files ) {

  return gulp.src( files )
    .pipe( plugins.imagemin({
      optimizationLevel: 6,
      progessive: true,
      interlaced: true
    }) )
    .pipe(gulp.dest( dest ))
    .on('end', function(){
      log( 'Images', 'Optimized: from '+src+' to '+dest);
    });
}
