# Gulp Start

Gulp setup with common tasks for building assets

- [x] Sass

- [x] Autoprefixer

- [x] Browserify

- [x] Babel

- [x] CoffeeScript

- [x] JSHint

- [x] Minify JS and CSS

- [x] Watch files and build

- [x] Multiple bundles

- [x] BrowserSync

- [x] Static file server

- [x] Zip

---

To do:

- Compress images

- React, JSX

- Stylus

- Jade

- [Strip debug/console statements](https://github.com/sindresorhus/gulp-strip-debug)

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
