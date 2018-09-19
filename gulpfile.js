const gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import')
    browserSync = require('browser-sync').create();

gulp.task('html', () => {

});

gulp.task('styles', () => {
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
        .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', () => {
    notify: false,
    browserSync.init({
       server: {
           basedir: "./",

       },
        startPath: "/app"
    });

    watch('./app/index.html', () => {
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.css', () => {
        gulp.start('cssInject');
    });
});

gulp.task('cssInject', ['styles'] ,() => {
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});