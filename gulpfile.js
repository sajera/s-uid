
var gulp = require('gulp');
var wrapper = require('gulp-wrap');
var anonymous = '(function () {\'use strict\';\n<%= contents %>\n})()';
var license = '/**\n * s-uid\
    \n * MIT License Copyright (c) 2016 Serhii Perekhrest <allsajera@gmail.com> ( Sajera )\
    \n */\n<%= contents %> ';


function src ( name ) {
    return gulp.src(['lib/*.js'])
        .pipe(require('gulp-order')([ // queue of files
            'uid.js',
            'time.js',
            'guid.js',
            'define.js'
        ]))
        .pipe( require('gulp-concat')(name||'uid.js') )
        .pipe( wrapper(anonymous) );
}

gulp.task('concat', function () {
    return src('uid.js')
        .pipe( wrapper(license) )
        .pipe( gulp.dest('./') );
});

gulp.task('minify', function () {
    return src('uid.min.js')
        .pipe( require('gulp-uglify')() )
        .pipe( wrapper(license) )
        .pipe( gulp.dest('./') );
});

gulp.task('watch', function () {
    
    gulp.watch('lib/*.js', ['concat']);

});