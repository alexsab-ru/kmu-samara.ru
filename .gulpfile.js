// VARIABLES & PATHS
let preprocessor = 'sass', // Preprocessor (sass, scss, less, styl)
    fileswatch   = 'html,htm,txt,json,md,woff2,php', // List of files extensions for watching & hard reload (comma separated)
    pageversion  = 'html,htm,php', // List of files extensions for watching change version files (comma separated)
    imageswatch  = 'jpg,jpeg,png,webp,svg', // List of images extensions for watching & compression (comma separated)
    online       = true, // If «false» - Browsersync will work offline without internet connection
    basename     = require('path').basename(__dirname),
    forProd      = [
					'/**',
					' * @author Alexsab.ru',
					' */',
					''].join('\n');

const { src, dest, parallel, series, watch, task } = require('gulp'),
	sass           = require('gulp-sass'),
	cleancss       = require('gulp-clean-css'),
	concat         = require('gulp-concat'),
	browserSync    = require('browser-sync').create(),
	uglify         = require('gulp-uglify-es').default,
	autoprefixer   = require('gulp-autoprefixer'),
	imagemin       = require('gulp-imagemin'),
	newer          = require('gulp-newer'),
	rsync          = require('gulp-rsync'),
	del            = require('del'),
	connect        = require('gulp-connect-php'),
	header         = require('gulp-header'),
	notify         = require('gulp-notify'),
	rename         = require('gulp-rename'),
	responsive     = require('gulp-responsive'),
	pngquant       = require('imagemin-pngquant'),
	merge          = require('merge-stream'),
	// version        = require('gulp-version-number'),
	// revAll         = require('gulp-rev-all'),
	replace        = require('gulp-replace');

if(typeof projects == 'undefined') 
	global.projects = {};
if(typeof port == 'undefined') 
	global.port = 8100;


projects.newstreetpunk_kmu = {

	port: ++port,

	base: basename,
	dest: basename,

	styles: {
		src:	basename + '/' + preprocessor + '/styles.'+preprocessor,
		watch:    basename + '/' + preprocessor + '/**/*.'+preprocessor,
		dest:   basename + '/css',
		output: 'styles.css',
	},

	scripts: {
		src: [
			basename + '/libs/jquery/dist/jquery.min.js',
			basename + '/libs/Magnific-Popup-master/jquery.magnific-popup.js',
			basename + '/libs/slick/slick.js',
			// 'node_modules/slick-carousel/slick/slick.js',
			basename + '/libs/animate/animate-css.js',
			basename + '/libs/lazyload.min.js',
			basename + '/libs/waypoint.js',
			basename + '/js/map.js',
			basename + '/js/common.js', // Custom scripts. Always at the end
		],
		dest:       basename + '/js',
		output:     'scripts.min.js',
	},

	styles_new: {
		src:	basename + '/src/' + preprocessor + '/styles.'+preprocessor,
		watch:    basename + '/src/' + preprocessor + '/**/*.'+preprocessor,
		dest:   basename + '/css',
		output: 'styles.css',
	},

	scripts_new: {
		src: [
			basename + '/src/libs/jquery/dist/jquery.min.js',
			basename + '/src/libs/Magnific-Popup-master/jquery.magnific-popup.js',
			basename + '/src/libs/slick/slick.js',
			// 'node_modules/slick-carousel/slick/slick.js',
			basename + '/src/libs/animate/animate-css.js',
			basename + '/src/libs/lazyload.min.js',
			basename + '/src/libs/waypoint.js',
			basename + '/src/js/map.js',
			basename + '/src/js/common.js', // Custom scripts. Always at the end
		],
		dest:       basename + '/js',
		output:     'scripts.min.js',
	},

	code: {
		src: [
			basename  + '/**/*.{' + fileswatch + '}',
		],
	},

	forProd: [
		'/**',
		' * @author https://github.com/newstreetpunk',
		' * @editor https://github.com/alexsab',
		' */',
		''].join('\n'),
}



/* newstreetpunk_kmu BEGIN */

// Local Server
function newstreetpunk_kmu_browsersync() {
	connect.server({
		port: projects.newstreetpunk_kmu.port,
		base: projects.newstreetpunk_kmu.base,
	}, function (){
		browserSync.init({
			// server: { baseDir: projects.newstreetpunk_kmu.base + '/' },
			proxy: '127.0.0.1:' + projects.newstreetpunk_kmu.port,
			notify: false,
			online: online
		});
	});
};

// Custom Styles
function newstreetpunk_kmu_styles() {
	return src(projects.newstreetpunk_kmu.styles.src)
	.pipe(eval(preprocessor)({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(concat(projects.newstreetpunk_kmu.styles.output))
	.pipe(autoprefixer({ grid: true, overrideBrowserslist: ['last 10 versions'] }))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(dest(projects.newstreetpunk_kmu.styles.dest))
	.pipe(browserSync.stream())

};

// Scripts & JS Libraries
function newstreetpunk_kmu_scripts() {
	return src(projects.newstreetpunk_kmu.scripts.src)
	.pipe(concat(projects.newstreetpunk_kmu.scripts.output))
	.pipe(uglify()) // Minify js (opt.)
	.pipe(header(projects.newstreetpunk_kmu.forProd))
	.pipe(dest(projects.newstreetpunk_kmu.scripts.dest))
	.pipe(browserSync.stream())
};

function newstreetpunk_kmu_watch() {
	watch(projects.newstreetpunk_kmu.styles.watch, newstreetpunk_kmu_styles);
	watch(projects.newstreetpunk_kmu.scripts.src, newstreetpunk_kmu_scripts);

	watch(projects.newstreetpunk_kmu.code.src).on('change', browserSync.reload);
};

// Custom Styles
function newstreetpunk_kmu_styles_new() {
	return src(projects.newstreetpunk_kmu.styles_new.src)
	.pipe(eval(preprocessor)({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(concat(projects.newstreetpunk_kmu.styles_new.output))
	.pipe(autoprefixer({ grid: true, overrideBrowserslist: ['last 10 versions'] }))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(dest(projects.newstreetpunk_kmu.styles_new.dest))
	.pipe(browserSync.stream())

};

// Scripts & JS Libraries
function newstreetpunk_kmu_scripts_new() {
	return src(projects.newstreetpunk_kmu.scripts_new.src)
	.pipe(concat(projects.newstreetpunk_kmu.scripts.output))
	.pipe(uglify()) // Minify js (opt.)
	.pipe(header(projects.newstreetpunk_kmu.forProd))
	.pipe(dest(projects.newstreetpunk_kmu.scripts_new.dest))
	.pipe(browserSync.stream())
};

function newstreetpunk_kmu_watch_new() {
	watch(projects.newstreetpunk_kmu.styles_new.watch, newstreetpunk_kmu_styles_new);
	watch(projects.newstreetpunk_kmu.scripts_new.src, newstreetpunk_kmu_scripts_new);

	// watch(projects.newstreetpunk_kmu.code.src).on('change', browserSync.reload);
};

// module.exports = newstreetpunk_kmu_browsersync;
module.exports = parallel(newstreetpunk_kmu_styles_new, newstreetpunk_kmu_scripts_new, newstreetpunk_kmu_browsersync, newstreetpunk_kmu_watch_new);
// module.exports = parallel(newstreetpunk_kmu_styles, newstreetpunk_kmu_scripts, newstreetpunk_kmu_browsersync, newstreetpunk_kmu_watch);


/* newstreetpunk_kmu END */

