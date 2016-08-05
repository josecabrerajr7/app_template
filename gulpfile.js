var gulp 			= require('gulp'),
	autoprefixer 	= require('gulp-autoprefixer'),
	concat			= require('gulp-concat'),
	jshint			= require('gulp-jshint'),
	ngAnnotate   	= require('gulp-ng-annotate'),
	plumber			= require('gulp-plumber'),
	sourcemaps		= require('gulp-sourcemaps'),
	uglify			= require('gulp-uglify'),
	watch			= require('gulp-watch'),
	iife 			= require("gulp-iife");
	
	gulp.task('js-vendors', function() {
		gulp.src([
			'./bower_components/jquery/dist/jquery.js',
			'./bower_components/mousetrap/mousetrap.min.js',
			'./bower_components/angular/angular.js',
			'./bower_components/angular-ui-router/release/angular-ui-router.js',
			'./bower_components/ng-file-upload/ng-file-upload.js',
			'./bower_components/angular-messages/angular-messages.js',
			'./bower_components/bootstrap/dist/js/bootstrap.js'
		])
			.pipe(sourcemaps.init())
			.pipe(concat('vendors.js'))
		  	.pipe(ngAnnotate())
		  	.pipe(uglify())
		  	.pipe(sourcemaps.write())
		  	.pipe(gulp.dest('./public/js'));
	});

	gulp.task('js', function () {
    
    var baseDir = __dirname + '/app/modules',
        outputDir = __dirname + '/public/js',
        outputFilename = 'app.js';

    gulp.src([
        baseDir + "/*module.js",
        baseDir + "/**/*module.js",
        baseDir + "/**/*.js"
    ])
    	.pipe(iife())
    	.pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat(outputFilename))
        .pipe(ngAnnotate())
        .pipe(gulp.dest(outputDir))
        .pipe(sourcemaps.write());
	});

	gulp.task('views', function () {
	    gulp.src(
	    	'./app/modules/**/*.html'
	    )
	    	.pipe(gulp.dest('./public/views'));
	    
	    gulp.src(	
	    	'./app/includes/**/*.html'
	    )
	        .pipe(gulp.dest('./public/views/includes'));
	});

	gulp.task('css-vendors', function () {
	    gulp.src([
	        "./bower_components/bootstrap/dist/css/bootstrap.css"
	    ])
	        .pipe(concat('vendors.css'))
	        .pipe(gulp.dest('./public/css'));
	});

	gulp.task('css', function () {
	    gulp.src([
	        './css/**/*.css'
	    ])
	        .pipe(concat('styles.css'))
	        .pipe(gulp.dest('./public/css'));
	});

	gulp.task('watch', function () {
	    
	    watch(['./app/modules/*directive.js', './app/models/*.js', './app/modules/*config.js', './app/modules/*module.js'], function () {
	        gulp.start('js');
	    });

	    watch('./css/**/*.css', function () {
	        gulp.start('css');
	    });

	    watch(['./app/modules/*.html', './app/modules/**/*.html', './app/includes/**/*.html'], function () {
	        gulp.start('views');
	    });
	});

	gulp.task('default', ['js-vendors', 'views', 'css-vendors', 'js', 'css', 'watch']);