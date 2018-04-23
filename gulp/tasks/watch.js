var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();


gulp.task('watch', function() {

	//notify is to stop alert when reload, baseDir is the root directory file is contained in
	browserSync.init({
		notify: false,
		server: {
			baseDir: "app"
		}
	})
	//for refresh when html is saved, not included css
	watch('./app/index.html', function() {
		browserSync.reload();
	})
	watch('./app/assets/styles/**/*.css', function() {
		gulp.start('cssInject');
	})
})

//for css refresh

//styles task is to generate compiled css, it contains error msg
//putting dependencies allows compiled css to be created prior to cssInject
gulp.task('cssInject', ['styles'], function() {
	return gulp.src('./app/temp/styles/styles.css')
		.pipe(browserSync.stream());
});