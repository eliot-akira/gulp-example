
// Define configuration here
var config = {
  assets: {
    name: 'app',
    src: 'src',
    dest: 'public',
    js: {
      lint: true
      //babel : true,
      //extension: '.es6'
      //coffee : true
    },
    css: {
      sass : true,
    }
  },
  browserSync: {
    server: './public'
  }
};

require('./gulp/launch')( config );
