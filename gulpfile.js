// imports from node_modules

let gulp = require('gulp');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let minifyCss = require('gulp-clean-css');
let stripCss = require('gulp-strip-css-comments');
let remove = require('del');


// Global parameters and functions

let renamer = {
    suffix: '.min'
};

let getPath = function ($dir, $exc = ['']) {
    var $excludes = [''];
    for (let i = 0, l = $exc.length; i < l; i++) {
        (i == 0) ? $excludes[i] = '!./src/' + $exc[i] + '/*.scss': $excludes.push('!./src/' + $exc[i] + '/*.scss');
    };
    var paths = {
        styles: {
            src: './src/' + $dir + '/*.scss',
            dest: './dist/css/' + $dir,
            exc: $excludes
        }
    };
    return paths;
};

let watchPaths = function ($dirs = ['']) {
    var $sources = [''];
    var $tasks = [''];
    for (let i = 0, l = $dirs.length; i < l; i++) {
        (i == 0) ? $sources[i] = './src/' + $dirs[i] + '/*.scss': $sources.push('./src/' + $dirs[i] + '/*.scss');
        (i == 0) ? $tasks[i] = 'smart_' + $dirs[i]: $tasks.push('smart_' + $dirs[i]);
    };
    var $obj = {
        styles: {
            src: $sources,
            tsk: $tasks
        }
    };
    return $obj;
};


// Gulp tasks

gulp.task('remove_css', () => {
    return remove(['./dist/css/']);
});

gulp.task('smart_base', () => {
    var path = getPath('base');
    var pipeline = gulp.src([path.styles.src])
        .pipe(sass())
        .pipe(stripCss())
        .pipe(gulp.dest(path.styles.dest))
        .pipe(rename(renamer))
        .pipe(minifyCss())
        .pipe(gulp.dest(path.styles.dest));
    return pipeline;
});

gulp.task('smart_buttons', () => {
    var path = getPath('buttons');
    var pipeline = gulp.src([path.styles.src])
        .pipe(sass())
        .pipe(stripCss())
        .pipe(gulp.dest(path.styles.dest))
        .pipe(rename(renamer))
        .pipe(minifyCss())
        .pipe(gulp.dest(path.styles.dest));
    return pipeline;
});

gulp.task('smart_forms', () => {
    var path = getPath('forms');
    var pipeline = gulp.src([path.styles.src])
        .pipe(sass())
        .pipe(stripCss())
        .pipe(gulp.dest(path.styles.dest))
        .pipe(rename(renamer))
        .pipe(minifyCss())
        .pipe(gulp.dest(path.styles.dest));
    return pipeline;
});

gulp.task('smart_tables', () => {
    var path = getPath('tables');
    var pipeline = gulp.src([path.styles.src])
        .pipe(sass())
        .pipe(stripCss())
        .pipe(gulp.dest(path.styles.dest))
        .pipe(rename(renamer))
        .pipe(minifyCss())
        .pipe(gulp.dest(path.styles.dest));
    return pipeline;
});

gulp.task('smart_bundle', () => {
    var path = getPath('**');
    var outDir = './dist/css/bundle/';
    var pipeline = gulp.src([path.styles.src])
        .pipe(sass())
        .pipe(concat('smart.css'))
        .pipe(stripCss())
        .pipe(gulp.dest(outDir))
        .pipe(rename(renamer))
        .pipe(minifyCss())
        .pipe(gulp.dest(outDir));
    return pipeline;
});

gulp.task('watch', () => {
    var paths = watchPaths(['base', 'buttons', 'forms', 'tables']);
    gulp.watch(paths.styles.src[0], [paths.styles.tsk[0]]);
    gulp.watch(paths.styles.src[1], [paths.styles.tsk[1]]);
    gulp.watch(paths.styles.src[2], [paths.styles.tsk[2]]);
    gulp.watch(paths.styles.src[3], [paths.styles.tsk[3]]);
});

gulp.task('default', ['watch']);