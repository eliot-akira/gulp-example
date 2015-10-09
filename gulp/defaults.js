
var slug = require('slug');
var setDefault = require('./util/set-default.js');
var path = require('path');

module.exports = function setAllDefaults( config ) {

  var index = 0, preparedAssets = [];

  if ( ! Array.isArray(config.assets) ) config.assets = [ config.assets ];

  config.tasks = [ 'default', 'watch' ];

  config.globalIgnore = '!{**/_unused*,**/_unused*/**}';

  config.min = setDefault.value( config.min, '' ); // '.min'

  if (config.browserSync) {

    browserSyncDefaults = {
      injectChanges: true,
      //logLevel: "debug",
      minify: false,
      open: false,
      browser: ['firefox'], // google chrome no good when editing style in inspector
      notify: false
    };

    if ( config.nodemon ) {
      config.nodemon = setDefault.booleanObject(config.nodemon, false, {
        script: 'server.js',
        watch: ['server.js', './server/**/*'],
        delay: 1700 // delay before browserSync.reload
      });
      browserSyncDefaults.proxy = 'http://localhost:3000';
      browserSyncDefaults.port = 4000;
    } else {

      // Static file server
      config.browserSync.server = setDefault.value(config.browserSync.server, './public');
      browserSyncDefaults.watch = path.join(config.browserSync.server, '*.html');
    }

    config.browserSync = setDefault.props(
      config.browserSync, browserSyncDefaults
    );
  }



  /*---------------------------------------------
   *
   * Set defaults for all assets
   *
   */

  config.assets.forEach( function(asset) {

    if ( asset.name ) asset.name = slug( asset.name );
    else asset.name = 'app'+( index++ == 1 ? '' : index );

    asset.folder = asset.folder || './';
    asset = setDefault.props( asset, {
      src: path.join(asset.folder, 'src'),
      dest: path.join(asset.folder, 'public'),
      min: config.min,
      lint: false
    });

    /*---------------------------------------------
     *
     * CSS
     *
     */

    if ( asset.css ) {

      config.tasks = setDefault.inArray(config.tasks, 'css');

      if ( typeof asset.css === 'boolean' ) asset.css = {};

      asset.css = setDefault.props( asset.css, {
        slug: asset.name || 'style',
        src: path.join(asset.src, 'css'),
        dest: path.join(asset.dest, 'css'),
        sass: true,
        entry: 'index',
        autoprefix: true,
        clean: false // Remove previous bundle
      });

      if ( asset.css.files ) {
        asset.css.concat = true;
        asset.css.files = setDefault.array( asset.css.files, [] );
      } else {
        asset.css.concat = false;
        asset.css.files = [];
      }
      asset.css.files.push(
        path.join(asset.css.dest, asset.css.slug+'.css'),
        config.globalIgnore
      );

      if ( asset.css.sass ) {
        asset.css.sass = setDefault.props( asset.css.sass, {
          errLogToConsole: true,
        });
        asset.css.extension = setDefault.value( asset.css.extension, '.scss' );
      } else {
        asset.css.extension = setDefault.value( asset.css.extension, '.css' );
      }

      asset.css.minExtension = asset.min+'.css';

      asset.css.autoprefix = setDefault.booleanObject( asset.css.autoprefix, true, {
        browsers: ['last 2 versions', 'ie 9', '> 1%'],
        cascade: false
      });

      asset.css.watch = setDefault.booleanArray( asset.css.watch, true,
        path.join(asset.css.src, '**/*' + asset.css.extension)
      );
      if ( asset.css.watch ) {
        if ( asset.css.sass ) asset.css.watch.push( path.join(asset.css.src, '**/*.css') );
        asset.css.watch.push( config.globalIgnore );
      }

      if ( config.browserSync ) {
        asset.css.browserSync = asset.css.browserSync || true;
      }
    }

    /*---------------------------------------------
     *
     * JS
     *
     */

    if ( asset.js ) {

      config.tasks = setDefault.inArray(config.tasks, 'js');

      if ( typeof asset.js === 'boolean' ) asset.js = {};

      asset.js = setDefault.props( asset.js, {
        slug: asset.name || 'script',
        src: path.join(asset.src, 'js'),
        dest: path.join(asset.dest, 'js'),
        browserify: true,
        entry: 'index',
        clean: false // Remove previous bundle
      });

      if ( asset.js.files ) {
        asset.js.concat = true;
        asset.js.files = setDefault.array( asset.js.files, [] );
      } else {
        asset.js.concat = false;
        asset.js.files = [];
      }
      asset.js.files.push(
        path.join(asset.js.dest, asset.js.slug+'.js'),
        config.globalIgnore
      );

      asset.js.extension = asset.js.coffee ?
        setDefault.value( asset.js.extension, '.coffee' ) :
        setDefault.value( asset.js.extension, '.js' );

      asset.js.minExtension = asset.min+'.js';

      asset.js.lint = setDefault.value(asset.js.lint, asset.lint);
      asset.js.lint = setDefault.booleanArray( asset.js.lint, false,
        path.join(asset.js.src, '**/*' + asset.js.extension)
      );
      if ( asset.js.lint ) asset.js.lint.push(
        '!'+path.join(asset.js.src, 'lib/**/*'),
        config.globalIgnore
      );

      if ( config.browserify ) {
        asset.js.browserify = setDefault.booleanObject(
          asset.js.browserify, true, config.browserify
        );
      }

      asset.js.watch = setDefault.booleanArray( asset.js.watch, true,
        path.join(asset.js.src, '**/*' + asset.js.extension)
      );
      if ( asset.js.watch ) {
        if ( asset.js.coffee ) asset.js.watch.push( path.join(asset.js.src, '**/*.js') );
        asset.js.watch.push( config.globalIgnore );
      }

      if ( config.browserSync ) {
        asset.js.browserSync = asset.js.browserSync || true;
      }
    }


    /*---------------------------------------------
     *
     * Images
     *
     * TODO: implement
     *
     */

    if ( asset.images ) {

      config.tasks = setDefault.inArray(config.tasks, 'image');

      if ( typeof asset.images === 'boolean' ) asset.images = {};

      asset.images = setDefault.props( asset.images, {
        src: path.join(asset.src, 'img'),
        dest: path.join(asset.dest, 'img'),
        options: {}
      });
    }


    /*---------------------------------------------
     *
     * Zip
     *
     */

    if ( asset.zip ) {

      config.tasks = setDefault.inArray(config.tasks, 'zip');

      if ( typeof asset.zip === 'boolean' ) asset.zip = {};

      asset.zip = setDefault.props( asset.zip, {
        slug: asset.zip.name || asset.name,
        src: asset.folder,
        dest: asset.folder
      });

      asset.zip.files = setDefault.array( asset.zip.files,
        path.join(asset.zip.src, '**/**/*')
      );
      asset.zip.files = asset.zip.files.concat([
        '!**/*.zip',
        '!**/.git/**/*',
        '!**/.gitignore',
        '!**/node_modules',
        '!**/node_modules/**',
        config.globalIgnore
      ]);
    }

    preparedAssets.push( asset );

  }); // For each asset of config.assets

  config.assets = preparedAssets;

  return config;
};
