/*
 * @Author: zhuyanrui 
 * @Date: 2018-11-05 08:48:59 
 * @Last Modified by: zhuyanrui
 * @Last Modified time: 2018-11-05 09:54:52
 */
var gulp = require('gulp'); //引入gulp
var sass = require('gulp-sass'); //编译sass
var server = require('gulp-webserver'); //起服务
var clean = require('gulp-clean-css'); //压缩css
var uglify = require('gulp-uglify'); //压缩js
var auto = require('gulp-autoprefixer'); //自动添加前缀
var babel = require('gulp-babel'); //es6转es5
var fs = require('fs'); //操作文件
var path = require('path'); //操作路径
var url = require('url'); //操作地址
//编译scss
gulp.task('devcss', function() {
        return gulp.src('./src/sass_styles/style.scss')
            .pipe(sass())
            .pipe(auto({
                browsers: ['last 2 versions']
            }))
            .pipe(clean())
            // return gulp.src('./src/*.html', './src/js/index.js', './src/sass_styles/*.scss')
            .pipe(gulp.dest('./src/styles'))
    })
    //压缩js的
gulp.task('devjs', function() {
        return gulp.src('./src/js/index.js')
            // .pipe(babel({
            //     presets: ['@babel/env']
            // }))
            .pipe(uglify())
            .pipe(gulp.dest('./src/dist'));
    })
    //监听
gulp.task('watch', function() {
        return gulp.watch('./src/sass_styles/style.scss', gulp.series('devcss'))
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
                    var pathname = url.parse(req.url).pathname;
                    if (pathname === '/') {
                        res.end(fs.readFileSync(path.join(__dirname, 'src', 'index.html')))
                    } else {
                        res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                    }
                }
            }))
    })
    //合并
gulp.task('dev', gulp.series('devcss', 'devjs', 'devserver', 'watch'))