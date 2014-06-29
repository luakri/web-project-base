Project base - Grunt tasks
================

Web Project Base - Grunt tasks setup

What Is It
----------
The project has setup default Grunt tasks.

Prerequisites
-------------
The Web Project Base requires the following dependencies.

* [Node.js](http://nodejs.org/download/)
* [Grunt Command Line Interface (CLI)](https://github.com/gruntjs/grunt-cli)

Requirements
-------------
    npm install

Structure
---------
The project is based on a source and a dist folder.
The project consists of the following Grunt Tasks:

* [grunt](https://github.com/gruntjs/grunt)
* [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean)
* [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)
* [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy)
* [grunt-contrib-htmlmin](https://github.com/poppinlp/grunt-htmlmin)
* [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
* [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass)
* [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
* [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
* [grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer)
* [grunt-html-build](https://github.com/spatools/grunt-html-build)
* [grunt-json-minify](https://github.com/werk85/grunt-json-minify)
* [grunt-jsonlint](https://github.com/brandonramirez/grunt-jsonlint)
* [grunt-modernizr](https://github.com/Modernizr/grunt-modernizr)
* [grunt-newer](https://github.com/tschaub/grunt-newer)
* [load-grunt-tasks](https://github.com/sindresorhus/time-grunt)
* [time-grunt](https://github.com/sindresorhus/time-grunt)

Tasks executed for local
---------
* Jshint Lint
* Json Lint
* Sass Source Maps
* Sass Style extended
* Css Autoprefixer
* Modernizr Build
* htmlbuild

Tasks executed for production
---------
* Jshint Lint
* Javascript concat
* Uglify Javascript
* Javascript Source Maps
* Json Lint
* Json Minify
* Sass Source Maps
* Sass Style compressed
* Css Autoprefixer
* Modernizr Build
* htmlbuild
* HTML Minification

Usage
------------
To run project for development

    grunt

To run build for production:

    grunt prod -env=prod

To run project for production, after build for production:
    grunt run

Changelog
---------
- *1.0*: Initial Release