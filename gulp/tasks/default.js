var gulp = require('gulp'),
    log = require('../util/log'),
    path = require('path'),
    allTasks = [],
    cssTasks = [], cssDevTasks = [],
    jsTasks = [], jsDevTasks = [], cleanTasks = [],
    lintTasks = [], imgTasks = [], zipTasks = [],
    task = '',
    browserSync;

module.exports = function defaultTasks( config ) {

  if (config.browserSync) {
    browserSync = require('browser-sync').create();
  }

  for (var asset of config.assets) {

    if ( asset.css ) {
      task = 'css-min-'+asset.css.slug;
      allTasks.push(task);
      cssTasks.push(task);
      cssDevTasks.push('css-dev-'+asset.css.slug);
      if ( asset.css.clean ) cleanTasks.push('css-clean-'+asset.css.slug);
      if ( asset.css.lint ) lintTasks.push('css-lint-'+asset.css.slug);

      if (config.browserSync) asset.css.browserSyncInstance = browserSync;
    }

    if ( asset.js ) {
      task = 'js-min-'+asset.js.slug;
      allTasks.push(task);
      jsTasks.push(task);
      jsDevTasks.push('js-dev-'+asset.js.slug);
      if ( asset.js.clean ) cleanTasks.push('js-clean-'+asset.css.slug);
      if ( asset.js.lint ) lintTasks.push('js-lint-'+asset.js.slug);

      if (config.browserSync) asset.js.browserSyncInstance = browserSync;
    }

    if ( asset.image ) {
      task = 'image-min-'+asset.asset.image.slug;
      allTasks.push(task);
      imgTasks.push(task);
    }

    if ( asset.zip ) {
      task = 'zip-'+asset.zip.slug;
      allTasks.push(task);
      zipTasks.push(task);
    }

  } // End for asset of config.assets

  var devTasks = [];

  if ( cssTasks.length ) gulp.task('css', cssTasks);
  if ( cssDevTasks.length ) {
    gulp.task('css-dev', cssDevTasks);
    devTasks = devTasks.concat(cssDevTasks);
  }
  if ( jsTasks.length ) gulp.task('js', jsTasks);
  if ( jsDevTasks.length ) {
    gulp.task('js-dev', jsDevTasks);
    devTasks = devTasks.concat(jsDevTasks);
  }

  if ( cleanTasks.length ) gulp.task('clean', cleanTasks);
  if ( lintTasks.length ) gulp.task('lint', lintTasks);
  if ( imgTasks.length ) gulp.task('img', imgTasks);
  if ( zipTasks.length ) gulp.task('zip', zipTasks);

  gulp.task('dev', devTasks);

  gulp.task('default', allTasks);

  if (config.browserSync) {

    gulp.task('serve', [], function() {
        browserSync.use({
          plugin: function () { /* noop */ },
          hooks: {
              'client:js': require('fs').readFileSync(
                path.join(__dirname, '../util/closer.js'), 'utf-8'
              )
          }
        });
        browserSync.init( config.browserSync );
        gulp.start('watch');
        gulp.watch(config.browserSync.watch).on('change', browserSync.reload);
    });
  }

};
