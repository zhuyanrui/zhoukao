/*
 * @Author: zhuyanrui 
 * @Date: 2018-11-05 08:48:59 
 * @Last Modified by: zhuyanrui
 * @Last Modified time: 2018-11-05 09:00:12
 */
var gulp = require('gulp'); //引入gulp
var sass = require('gulp-sass'); //编译sass
var server = require('gulp-webserver'); //起服务
var clean = require('gulp-clean-css'); //压缩css
var uglify = require('gulp-uglify'); //压缩js
var auto = require('gulp-autoprefixer'); //自动添加前缀
// var babel = require('gulp-babel'); //es6转es5
//建任务
gulp.task('devcss', function() {
        return gulp.src('./src/sass_styles/*.scss')
            .pipe(sass())
            .pipe(auto({
                browsers: ['last 2 versions']
            }))
            .pipe(clean())
            .pipe(gulp.dest('./src/styles'))
    })
    //监听
gulp.task('watch', function() {
        return gulp.watch('./src/sass_styles/*.scss', gulp.series('devcss'))
    })
    //起服务
gulp.task('devserver', function() {
        return gulp.src('src')
            .pipe(server({
                port: 9090,
                // open:true,
                middleware: function(req, res, next) {
                    if (req.url === '/favicon.ico') {
                        return res.end();
                    }
                }
            }))
    })
    //合并
gulp.task('dev', gulp.series('devcss', 'devserver', 'watch'))