const gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

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