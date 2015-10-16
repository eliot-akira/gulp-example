# Gulp Start

Gulp setup with common tasks for building assets

- [x] Sass, Autoprefixer

- [x] Browserify, Babel, React/JSX, CoffeeScript, JSHint

- [x] Minify JS and CSS

- [x] Watch files and build

- [x] Multiple bundles

- [x] BrowserSync with Nodemon or static file server

- [x] Zip

---

To do:

- Prepare for Gulp 4 with task series and parallel

- Optional CoffeeScript version

- Optimize images

- Stylus, Jade

- [Strip debug/console statements](https://github.com/sindresorhus/gulp-strip-debug)?

- PostCSS, Webpack?

---

## Build

##### Requires [Node.js](https://nodejs.org/) and its included package manager, *npm*

The following commands are run from the root of the project folder.

**Install dependencies**

```sh
npm install
```

This installs the Gulp task manager and supporting modules.

**Build and minify assets**

```sh
npm run build
```

**Build with source maps**

```sh
npm run dev
```

**Watch for file changes and automatically build with source maps**

```sh
npm run watch
```

**Start static file server with watch and browser sync**

```sh
npm run serve
```

**Lint JS files**

```sh
npm run lint
```

**Remove compiled assets**

```sh
npm run clean
```


---

## Configure

Edit configuration in *gulpfile.js*. See below some optional settings.

```javascript
var config = {

  // Assets are defined as object or array of objects for multiple bundles
  assets: {

    name: 'app',
    src: 'src',
    dest: 'public',

    js: {
      src: 'src/js',
      dest: 'public/js',
      lint: false,
      babel : false,
      extension: '.js', // .coffee, .es6, .jsx..
      coffee : false
    },

    css: {
      sass : true
      autoprefixer: {
        ...
      }
    }
  },

  // Static file server
  browserSync: {
    server: './public'
  },

  // ..or Nodemon
  nodemon: {

  }
};

require('./gulp/launch')( config );
```
