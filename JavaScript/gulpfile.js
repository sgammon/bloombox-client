'use strict';
// jshint node: true

var _ = require('underscore'),
    merge = require('merge-stream'),
    path = require('path'),
    gulp = require('gulp'),
    open = require('gulp-open'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync'),
    $ = require('gulp-load-plugins')(),
    googleClosureCompiler = require('google-closure-compiler').gulp(),
    del = require('del'),
    Server = require('karma').Server,
    istanbul = require('gulp-istanbul'),
    reload = browserSync.reload;

let _version = "0.0.1";

let sourcePrefix = "src/",

  sources = {
    scripts: {
      common: [
        sourcePrefix + "common/_base.js",
        sourcePrefix + "common/logging.js",
        sourcePrefix + "common/api.js"
      ],
      api: {
        embed: [
          sourcePrefix + "api/embed/_base.js",
          sourcePrefix + "api/embed/index.js"
        ],
        all: [
          sourcePrefix + "api/_base.js",
          sourcePrefix + "api/tools.js",
          sourcePrefix + "api/all.js"
        ]
      }
    }
  },

  bloom = {
    version: _version,

    params: {
      closure: {
        base: {
          debug: true,
          env: "BROWSER",
          charset: "UTF-8",
          language_in: "ECMASCRIPT6",
          language_out: "ECMASCRIPT5",
          warning_level: "VERBOSE",
          dependency_mode: "NONE",
          third_party: true,
          use_types_for_optimization: true,
          process_closure_primitives: true,
          rewrite_polyfills: true
        },
        advanced: {
          compilation_level: "ADVANCED_OPTIMIZATIONS"
        }
      },
    },

    config: {
      target: "target",

      scripts: [
        {closure: true,
         config: "advanced",
         module: [
           "common:" + countSources(sources.scripts.common),
           "embed:" + countSources(sources.scripts.api.embed) + ":common"
         ],
         sources: []
           .concat(sources.scripts.common)
           .concat(sources.scripts.api.embed)},
        {closure: true,
         config: "advanced",
         target: "bloombox-api-client-" + _version,
         sources: []
           .concat(sources.scripts.common)
           .concat(sources.scripts.api.embed)
           .concat(sources.scripts.api.all)}]}};

function renameCompiledJs() {
  return (function (path) {
    if (path.extname.indexOf(".min") === -1)
      path.extname = ".min.js";
  });
}

function listDir(dir) {
  return walkSync(dir, false);
}

function countSources(dir) {
  if (Array.isArray(dir)) {
    return dir.length;
  }
  var list = listDir(dir.replace("**/*", "").replace("build/", "").replace("*.js", ""));
  if (Array.isArray(list))
    return list.length;
  console.error("Failed to count items in directory: " + dir);
}

function string_src(filename, string) {
  var src = require('stream').Readable({ objectMode: true });
  src._read = function () {
    this.push(new gutil.File({
      cwd: "",
      base: "",
      path: filename,
      contents: new Buffer(string)
    }));
    this.push(null);
  };
  return src
}

function outputDir(postfix) {
  if (postfix)
    return [bloom.config.target, postfix].join("/");
  return bloom.config.target;
}

function reportError(err) {
  console.log(err.toString());
}

function swallowError(err) {
  reportError(err);
  this.emit("end");
}

// JS
gulp.task('apiclient:js:build', function () {
  var source_i, bundle, ops = [];
  for (source_i in bloom.config.scripts) {
    bundle = bloom.config.scripts[source_i];
    if (bundle.closure === true) {
      if (bundle.target) {
        let targetConfig = _.extend({}, bloom.params.closure.base, bloom.params.closure[bundle.config], {
          js_output_file: bundle.target + '.min.js'
        });

        // simple target
        ops.push(gulp.src(bundle.sources)
          .pipe(googleClosureCompiler(targetConfig))
          .on('error', reportError)
          .pipe(gulp.dest(bloom.config.target)));
      } else {
        let moduleConfig = _.extend({}, bloom.params.closure.base, bloom.params.closure[bundle.config], {
          module: bundle.module
        });

        // it's a module-based deal
        ops.push(gulp.src(bundle.sources)
          .pipe(googleClosureCompiler(moduleConfig))
          .pipe(gulp.dest(bloom.config.target)));
      }
    } else {
      ops.push(gulp.src(bundle.sources)
        .pipe(concat(bundle.target + ".js"))
        .on('error', reportError)
        .pipe(gulp.dest(bloom.config.target)));
    }
  }
  return merge(ops);
});

// Clean output directory
gulp.task('clean', function (cb) {
  del(['target/*'], cb);
});

gulp.task('copy', function () {
  return gulp.src([
    'demo.html'
  ], {
    dot: true
  }).pipe(gulp.dest(outputDir()));
});

gulp.task('serve', function () {
  browserSync({
    notify: false,
    server: {
      baseDir: ['target'],
    },
    startPath: "/demo.html"
  });

  gulp.watch(['src/**/*.*', 'demo.html'], ['default', reload]);
});

gulp.task('pre-test', function () {
  return gulp.src(['src/**/*.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    preprocessors: {
      'src/**/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type : 'html',
      dir : 'coverage/',
      subdir: '.'
    }
  }, done).on('error', function(err) {
           throw err;
       }).start();
});

gulp.task('coverage', function() {
  return gulp.src('./coverage/index.html')
             .pipe(open());
});

gulp.task('develop', ['default', 'coverage'], function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();

  browserSync({
    notify: false,
    server: {
      baseDir: ['target'],
    },
    startPath: "/demo.html"
  });

  gulp.watch(['src/**/*.*', 'test/**/*.*', 'demo.html'], ['default', reload]);
});

gulp.task('default', ['copy', 'apiclient:js:build']);

try { require('require-dir')('tasks'); } catch (err) {}