var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var jshint_stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-minify-css');
var image = require('gulp-image');
var runSequence = require('run-sequence');
var server=require('gulp-develop-server');

gulp.task('default', function() {
  runSequence('build', 'server:start','server:watch');
});

//for production builds
gulp.task('build', function() {
  runSequence('js-hint', 'sass','js-uglify','css-min');
});

//refreshes the browser page whenever any of the html/ejs is changed
gulp.task('layout-live', function() {
  gulp.src('./views/**/*')
    .pipe(livereload());
});

//compresses all the image assets
gulp.task('image',function(){
  gulp.src('./public/assets/images/**/*')
    .pipe(image())
    .pipe(gulp.dest("./public/assets/images"));
});

//lints all the javascript files
gulp.task('js-hint', function() {
  gulp.src('./public/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(jshint_stylish));
});

//concatanates all the javascript files
gulp.task('js-concat', function() {
  gulp.src(['./public/scripts/libs/**/*.js','./public/scripts/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/scripts/dist/'))
    .pipe(livereload());
});

//concatanates and minifies all the javascript files
gulp.task('js-uglify', function() {
  gulp.src(['./public/scripts/libs/**/*.js','./public/scripts/*.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/scripts/dist/'));
});

//compiles all the sass files into css
gulp.task('sass', function() {
  gulp.src(['./public/style/*.scss'])
    .pipe(sass({
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./public/style/dist/'));
});

//concatanates all the css files into a single file
gulp.task('css-concat', function() {
  gulp.src(['./public/style/libs/**/*.css','./public/style/dist/*.css','!./public/style/dist/dist.css'])
    .pipe(concat('dist.css'))
    .pipe(gulp.dest('./public/style/dist/'))
    .pipe(livereload());
});

//concatanates then minifies the all css files
gulp.task('css-min', function() {
  gulp.src(['./public/style/libs/**/*.css','./public/style/dist/*.css','!./public/style/dist/dist.css'])
    .pipe(concat('dist.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./public/style/dist/'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./public/style/*.scss', ['sass','css-concat']);
  gulp.watch('./views/**/*', ['layout-live']);
  gulp.watch('./public/scripts/**/*.js', ['js-hint','js-concat']);
});

// run server 
gulp.task( 'server:start', function() {
  server.listen( { path: './server.js' } );
});

// restart server if app.js changed 
gulp.task( 'server:watch', function() {
  gulp.watch( [ './server.js','./routes/*.js' ], server.restart );
});
