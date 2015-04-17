var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        rename: {
            'gulp-rev-all': 'revall'
        }
    }),

    path = require('path'),
    runSequence = require('run-sequence'),
    babelify = require("babelify");

var tinylr;
var expressSrc = path.join(__dirname, 'dist');
var liveReloadPort = 4002;
var expressServerPort = 4000;
var isDev = false;

gulp.task('express', function () {
    var express = require('express');
    var app = express();
    console.log('start express in ' + expressSrc);
    app.use(require('connect-livereload')({port: liveReloadPort}));
    app.use(function(req, res, next) {
        res.setHeader("Cache-Control", "no-cache");
        return next();
    });
    app.use(express.static(expressSrc));
    app.listen(expressServerPort);
});

gulp.task('livereload', function () {
    tinylr = require('tiny-lr')();
    tinylr.listen(liveReloadPort);
});

gulp.task('watch', function () {
    gulp.watch([expressSrc + '/**'], notifyLiveReload);

    gulp.watch(['./src/**/*.styl'], ['css']);
    gulp.watch(['./src/**/*.html'], ['html']);
    gulp.watch(['./src/**/*.js'], ['js']);
});

function notifyLiveReload(event) {
    var fileName = path.relative(__dirname, event.path);
    console.log('notifyLiveReload ' + fileName);

    tinylr.changed({
        body: {
            files: [fileName]
        }
    });
}

gulp.task('serve', function () {
    isDev = true;
    runSequence('build',['express', 'livereload'],['watch', 'open']);
});

gulp.task('open', function(){
    require('opn')('http://localhost:' + expressServerPort + '/');
});

gulp.task('css', function(){
    return gulp.src('./src/stylus/*-styles.styl')
        .pipe($.stylus())
        .on('error', function (err) {
            // Make sure failed tests cause gulp to exit non-zero
            if (isDev) {
                this.emit('end'); //instead of erroring the stream, end it
            }
        })
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('html', function(){
   return gulp.src('./src/**/*.html')
       .pipe(gulp.dest('./dist'));
});

gulp.task('js', function(){
    return gulp.src('./src/js/main.js')
        .pipe($.browserify({
                transform: [babelify]
            }
        ))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', ['css', 'js', 'html']);

