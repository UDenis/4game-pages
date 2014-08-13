var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    csscomb = require('gulp-csscomb'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    path = require('path');


gulp.task('css', function() {
    return gulp.src(['b/l2-ertheia.less'])
        .pipe(less({
            compress: false
        }))
        .pipe(csscomb())
        //        .pipe(autoprefixer("last 2 version"))
        .pipe(gulp.dest('b/'));
});

gulp.task('build', ['css']);

gulp.task('default', function() {
    gulp.run('css');
    gulp.watch('css/b/**/*', ['css']);
});