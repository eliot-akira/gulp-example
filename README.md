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

---

To do:

- Stylus

- Jade

- React, JSX

- Optimize images

- Static file server

- BrowserSync, Live reload

- [Strip debug/console statements](https://github.com/sindresorhus/gulp-strip-debug)

- Look into PostCSS, Webpack..

---


## Build

Requirement: [Node.js](https://nodejs.org/) and its included package manager, *npm*

The following commands are run from the root of the project folder.

*Install dependencies*

```sh
npm install
```

*Build and minify the resulting file*

```sh
npm run build
```

*Build with source maps*

```sh
npm run dev
```

*Watch for file changes and automatically build with source maps*

```sh
npm run watch
```

*Lint JS files*

```sh
npm run lint
```

*Remove compiled files*

```sh
npm run clean
```
