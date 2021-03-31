// VARIABLES & PATHS
let preprocessor = 'sass', // Preprocessor (sass, scss, less, styl)
    fileswatch   = 'html,htm,txt,json,md,woff2,php,markdown', // List of files extensions for watching & hard reload (comma separated)
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
	{ spawn, exec } = require('child_process'),
	replace        = require('gulp-replace');

if(typeof projects == 'undefined') 
	global.projects = {};
if(typeof port == 'undefined') 
	global.port = 8100;
if(typeof jekyllPort == 'undefined') 
	global.jekyllPort = 4000;


projects.kmu_samara = {

	port: ++port,
	jekyllPort: ++jekyllPort,

	base: basename,
	dest: basename,

	styles: {
		src:	basename + '/src/' + preprocessor + '/styles.'+preprocessor,
		watch:    basename + '/src/' + preprocessor + '/**/*.'+preprocessor,
		dest:   basename + '/css',
		output: 'styles.css',
	},

	scripts: {
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

	styles_jekyll: {
		src:	'src/' + preprocessor + '/styles.'+preprocessor,
		watch:    'src/' + preprocessor + '/**/*.'+preprocessor,
		dest:   'css',
		output: 'styles.css',
	},

	scripts_jekyll: {
		src: [
			'src/libs/jquery/dist/jquery.min.js',
			'src/libs/Magnific-Popup-master/jquery.magnific-popup.js',
			'src/libs/slick/slick.js',
			// 'node_modules/slick-carousel/slick/slick.js',
			'src/libs/animate/animate-css.js',
			'src/libs/lazyload.min.js',
			'src/libs/waypoint.js',
			'src/js/map.js',
			'src/js/common.js', // Custom scripts. Always at the end
		],
		dest:       'js',
		output:     'scripts.min.js',
	},

	code_jekyll: {
		src: [
			'**/*.{' + fileswatch + '}',
		],
	},

	forProd: [
		'/**',
		' * @author https://github.com/newstreetpunk',
		' * @author https://github.com/alexsab',
		' */',
		''].join('\n'),
}



/* kmu_samara BEGIN */

// Local Server
function kmu_samara_browsersync() {
	connect.server({
		port: projects.kmu_samara.port,
		base: projects.kmu_samara.base + '/dist/',
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


function kmu_samara_browsersync_jekyll() {
	browserSync.init({
		proxy: '127.0.0.1:' + projects.kmu_samara.jekyllPort,
		notify: false,
		online: online
	});
};

// Custom Styles
function kmu_samara_styles_jekyll() {
	return src(projects.kmu_samara.styles_jekyll.src)
	.pipe(eval(preprocessor)({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(concat(projects.kmu_samara.styles_jekyll.output))
	.pipe(autoprefixer({ grid: true, overrideBrowserslist: ['last 10 versions'] }))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(dest(projects.kmu_samara.styles_jekyll.dest))
	.pipe(browserSync.stream())

};

// Scripts & JS Libraries
function kmu_samara_scripts_jekyll() {
	return src(projects.kmu_samara.scripts_jekyll.src)
	.pipe(concat(projects.kmu_samara.scripts.output))
	.pipe(uglify()) // Minify js (opt.)
	.pipe(header(projects.kmu_samara.forProd))
	.pipe(dest(projects.kmu_samara.scripts_jekyll.dest))
	.pipe(browserSync.stream())
};

function kmu_samara_watch_jekyll() {
	watch(projects.kmu_samara.styles_jekyll.watch, kmu_samara_styles_jekyll);
	watch(projects.kmu_samara.scripts_jekyll.src, kmu_samara_scripts_jekyll);

	watch(projects.kmu_samara.code_jekyll.src).on('change', browserSync.reload);
};

function kmu_samara_cd_jekyll(callback) {

	process.chdir(process.cwd()+'/'+basename);
	// console.log(process.cwd());
}
function kmu_samara_run_jekyll(callback) {

	console.log('if you get error message: "Address already in use", run next command:');
	console.log('lsof -i :<PORT> — show you what process run on your port');
	console.log('kill -9 <PID> —  kill that process by PID');

	var build = exec('bundle exec jekyll serve --port ' + projects.kmu_samara.jekyllPort);
	// var build = spawn('bundle', ['exec', 'jekyll', 'serve']);

	build.stdout.on('data', (data) => {
	  console.log(`stdout: ` + data);
	});

	build.stderr.on('data', (data) => {
	  console.error(`stderr: ${data}`);
	});

	build.on('close', (code) => {
	  console.log(`child process exited with code ${code}`);
	});

	return build;
}

// exports.kmu_samara_jekyll = parallel(kmu_samara_styles_jekyll, kmu_samara_scripts_jekyll, kmu_samara_browsersync, kmu_samara_watch_jekyll);
exports.kmu_samara_jekyll_with_build = parallel(kmu_samara_cd_jekyll, kmu_samara_styles_jekyll, kmu_samara_scripts_jekyll, kmu_samara_run_jekyll, kmu_samara_browsersync_jekyll, kmu_samara_watch_jekyll);
exports.kmu_samara_just_jekyll = parallel(kmu_samara_cd_jekyll, kmu_samara_run_jekyll);
exports.kmu = parallel(kmu_samara_styles, kmu_samara_scripts, kmu_samara_browsersync, kmu_samara_watch);
exports.kmu_samara = parallel(kmu_samara_browsersync, kmu_samara_watch);


/* kmu_samara END */

