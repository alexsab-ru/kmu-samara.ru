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


projects.kmu_samara = {

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



/* kmu_samara BEGIN */

// Local Server
function kmu_samara_browsersync() {
	connect.server({
		port: projects.kmu_samara.port,
		base: projects.kmu_samara.base,
	}, function (){
		browserSync.init({
			// server: { baseDir: projects.kmu_samara.base + '/' },
			proxy: '127.0.0.1:' + projects.kmu_samara.port,
			notify: false,
			online: online
		});
	});
};

// Custom Styles
function kmu_samara_styles() {
	return src(projects.kmu_samara.styles.src)
	.pipe(eval(preprocessor)({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(concat(projects.kmu_samara.styles.output))
	.pipe(autoprefixer({ grid: true, overrideBrowserslist: ['last 10 versions'] }))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(dest(projects.kmu_samara.styles.dest))
	.pipe(browserSync.stream())

};

// Scripts & JS Libraries
function kmu_samara_scripts() {
	return src(projects.kmu_samara.scripts.src)
	.pipe(concat(projects.kmu_samara.scripts.output))
	.pipe(uglify()) // Minify js (opt.)
	.pipe(header(projects.kmu_samara.forProd))
	.pipe(dest(projects.kmu_samara.scripts.dest))
	.pipe(browserSync.stream())
};

function kmu_samara_watch() {
	watch(projects.kmu_samara.styles.watch, kmu_samara_styles);
	watch(projects.kmu_samara.scripts.src, kmu_samara_scripts);

	watch(projects.kmu_samara.code.src).on('change', browserSync.reload);
};

exports.kmu_samara = parallel(kmu_samara_styles, kmu_samara_scripts, kmu_samara_browsersync, kmu_samara_watch);


/* kmu_samara END */

