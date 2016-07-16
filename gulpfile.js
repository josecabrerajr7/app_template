var gulp 			= require('gulp'),
	autoprefixer 	= require('gulp-autoprefixer'),
	concat			= require('gulp-concat'),
	jshint			= require('gulp-jshint'),
	livereload		= require('gulp-livereload'),
	ngAnnotate   	= require('gulp-ng-annotate'),
	plumber			= require('gulp-plumber'),
	serve 			= require('gulp-serve'),
	sourcemaps		= require('gulp-sourcemaps'),
	uglify			= require('gulp-uglify'),
	watch			= require('gulp-watch');

	gulp.task('js-vendors', function() {
		gulp.src([

			'./bower_components/jquery/dist/jquery.js',
			'./bower_components/angular/angular.js',
			'./bower_components/angular-ui-router/angular-ui-router.js',
			'./bower_components/bootstrap/dist/js/bootstrap.js'

		])
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
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat(outputFilename))
        .pipe(ngAnnotate())
        .pipe(gulp.dest(outputDir))
        .pipe(livereload());
	});

	gulp.task('views', function () {
	    gulp.src(
	    	
	    	'./app/modules/**/*.html'
	    	
	    )
	        .pipe(gulp.dest('./public/views'))
	        .pipe(livereload());

	    gulp.src(
	    	
	    	'./app/includes/**/*.html'
	    	
	    )
	        .pipe(gulp.dest('./public/views/includes'))
	        .pipe(livereload());
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

	gulp.task('serve', serve('.'));

	gulp.task('watch', function () {
    	
    	livereload.listen({ port: 35730 });
	    
	    watch(['./app/modules/*.js', './app/modules/**/*.js'], function () {
	        gulp.start('js');
	    });

	    watch('./css/**/*.css', function () {
	        gulp.start('css');
	    });

	    watch(['./app/modules/*.html', './app/modules/**/*.html', './app/includes/**/*.html'], function () {
	        gulp.start('views');
	    });
	});

	gulp.task('default', ['js-vendors', 'views', 'css-vendors', 'js', 'watch', 'serve']);