'use strict';
// jshint node: true

var _ = require('underscore'),
    $ = require('gulp-load-plugins')(),
    merge = require('merge-stream'),
    path = require('path'),
    gulp = require('gulp'),
    open = require('gulp-open'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    crisper = require('gulp-crisper'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    googleClosureCompiler = require('google-closure-compiler').gulp(),
    del = require('del'),
    Server = require('karma').Server,
    istanbul = require('gulp-istanbul'),
    vulcanize = require('gulp-vulcanize'),
    polymerRename = require('polymer-rename'),
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
        minimal: [
          sourcePrefix + "api/_base.js",
          sourcePrefix + "api/tools.js",
          sourcePrefix + "api/all.js",
          sourcePrefix + "api/client.js",
          sourcePrefix + "api/exports.js"
        ],
        full: [
          sourcePrefix + "api/_base.js",
          sourcePrefix + "api/tools.js",
          sourcePrefix + "api/client.js",
          sourcePrefix + "api/all.js",
          sourcePrefix + "api/boot.js",
          sourcePrefix + "api/exports.js",
        ]
      },
      polymer: {
        component: [
          sourcePrefix + "polymer/bloombox-api-client.js"
        ],
        behavior: [
          sourcePrefix + "polymer/bloombox-api-client-behavior.js"
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
        },
        polymer: {
          compilation_level: "ADVANCED_OPTIMIZATIONS",
          polymer_pass: true,
          externs: [
            require.resolve("polymer-rename/polymer-rename-externs.js"),
            require.resolve("google-closure-compiler/contrib/externs/polymer-1.0.js"),
            require.resolve("google-closure-compiler/contrib/externs/google_loader_api.js"),
            require.resolve("google-closure-compiler/contrib/externs/google_universal_analytics_api.js")
          ]
        }
      },

      vulcanize: {
        polymer: {
          stripComments: true,
          stripExcludes: true,
          stripWhitespace: true,
          inlineScripts: true,
          inlineCss: true
        },
        phase1: {
          stripComments: true,
          stripExcludes: true,
          stripWhitespace: true,
          inlineScripts: true,
          inlineCss: true,
          excludes: ['components/polymer/polymer.html']
        }
      },

      crisper: {
        scriptInHead: false,
        onlySplit: true
      }
    },

    config: {
      target: "target",

      scripts: [
        {closure: true,
         config: "polymer",
         module: [
           "common:" + countSources(sources.scripts.common),
           "api:" + countSources(sources.scripts.api.minimal) + ":common",
           "embed:" + countSources(sources.scripts.api.embed) + ":common",
           "bloombox-api-client-behavior:" + countSources(sources.scripts.polymer.behavior) + ":api",
           "bloombox-api-client:" + countSources(sources.scripts.polymer.component) + ":api,bloombox-api-client-behavior"
         ],
         sources: []
           .concat(sources.scripts.common)
           .concat(sources.scripts.api.minimal)
           .concat(sources.scripts.api.embed)
           .concat(sources.scripts.polymer.behavior)
           .concat(sources.scripts.polymer.component)},
        {closure: true,
         config: "advanced",
         target: "bloombox-api-client-" + _version,
         sources: []
           .concat(sources.scripts.common)
           .concat(sources.scripts.api.embed)
           .concat(sources.scripts.api.full)}]}};

function renameCompiledJs() {
  return (function (path) {
    if (path.extname.indexOf(".min") === -1)
      path.extname = ".min.js";
  });
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

gulp.task('polymer:prebuild', function() {
  var ops = [];
  ops.push(gulp.src(['polymer/*'])
      .pipe(vulcanize(bloom.params.vulcanize.phase1))
      .pipe(crisper(bloom.params.crisper))
      .pipe(gulp.dest(bloom.config.target)));
  return merge(ops);
});

gulp.task('polymer:extract', ['polymer:prebuild'], function() {
  var ops = [];
  ops.push(gulp.src(outputDir('polymer/*.html'))
      .pipe(polymerRename.extract())
      .pipe(rename(function(filePath) {
        filePath.basename += '.template';
      }))
      .pipe(gulp.dest(bloom.config.target)));
  return merge(ops);
});

// JS
gulp.task('apiclient:js:build', function() {
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
          .pipe(concat(bundle.target + '.js'))
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

gulp.task('copy', function() {
  return gulp.src([
    'demo.html'
  ], {
    dot: true
  }).pipe(gulp.dest(outputDir()));
});

gulp.task('serve', function() {
  browserSync({
    notify: false,
    server: {
      baseDir: ['target'],
    },
    startPath: '/demo.html'
  });

  gulp.watch(['src/**/*.*', 'demo.html'], ['default', reload]);
});

gulp.task('pre-test', function() {
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
      type: 'html',
      dir: 'coverage/',
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

gulp.task('develop', ['default', 'coverage'], function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();

  browserSync({
    notify: false,
    server: {
      baseDir: ['target'],
    },
    startPath: '/demo.html'
  });

  gulp.watch(['src/**/*.*', 'test/**/*.*', 'demo.html'], ['default', reload]);
});

gulp.task('default', ['copy', 'polymer:extract', 'apiclient:js:build']);

try { require('require-dir')('tasks'); } catch (err) {}
