
var gulp = require('gulp'),
    action = {
      clean : require('./js/clean'),
      compile : require('./js/compile'),
      lint : require('./js/lint'),
      minify : require('./js/minify')
    };

module.exports = function JSTasks( config ) {

  for (var asset of config.assets) {

    if ( ! asset.js ) continue;

    var slug = asset.js.slug;

    gulp.task('js-clean-'+slug, function() {
      return action.clean( asset.js );
    });
    gulp.task('js-lint-'+slug, function() {
      if (asset.js.lint) return action.lint( asset.js );
    });

    gulp.task('js-compile-'+slug, ['js-clean-'+slug], function() {
      return action.compile( asset.js );
    });
    gulp.task('js-min-'+slug, ['js-compile-'+slug], function() {
      return action.minify( asset.js );
    });

    gulp.task('js-dev-compile-'+slug, ['js-lint-'+slug,'js-clean-'+slug], function() {
      return action.compile( asset.js, true );
    });
    gulp.task('js-dev-'+slug, ['js-dev-compile-'+slug], function() {
      return action.minify( asset.js, true );
    });

  }

};
