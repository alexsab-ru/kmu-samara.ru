let projects = {



	newstreetpunk_kmu: {

		port: ++port,

		base: base.newstreetpunk_kmu,
		dest: base.newstreetpunk_kmu,

		styles: {
			src:	base.newstreetpunk_kmu + '/' + preprocessor + '/styles.'+preprocessor,
			watch:    base.newstreetpunk_kmu + '/' + preprocessor + '/**/*.'+preprocessor,
			dest:   base.newstreetpunk_kmu + '/css',
			output: 'styles.css',
		},

		scripts: {
			src: [
				base.newstreetpunk_kmu + '/libs/jquery/dist/jquery.min.js',
				base.newstreetpunk_kmu + '/libs/Magnific-Popup-master/jquery.magnific-popup.js',
				'node_modules/slick-carousel/slick/slick.min.js',
				base.newstreetpunk_kmu + '/libs/animate/animate-css.js',
				base.newstreetpunk_kmu + '/libs/lazyload.min.js',
				base.newstreetpunk_kmu + '/libs/waypoint.js',
				base.newstreetpunk_kmu + '/js/map.js',
				base.newstreetpunk_kmu + '/js/common.js', // Custom scripts. Always at the end
			],
			dest:       base.newstreetpunk_kmu + '/js',
			output:     'scripts.min.js',
		},

		styles_new: {
			src:	base.newstreetpunk_kmu + '/src/' + preprocessor + '/styles.'+preprocessor,
			watch:    base.newstreetpunk_kmu + '/src/' + preprocessor + '/**/*.'+preprocessor,
			dest:   base.newstreetpunk_kmu + '/css',
			output: 'styles.css',
		},

		scripts_new: {
			src: [
				base.newstreetpunk_kmu + '/src/libs/jquery/dist/jquery.min.js',
				base.newstreetpunk_kmu + '/src/libs/Magnific-Popup-master/jquery.magnific-popup.js',
				'node_modules/slick-carousel/slick/slick.min.js',
				base.newstreetpunk_kmu + '/src/libs/animate/animate-css.js',
				base.newstreetpunk_kmu + '/src/libs/lazyload.min.js',
				base.newstreetpunk_kmu + '/src/libs/waypoint.js',
				base.newstreetpunk_kmu + '/src/js/map.js',
				base.newstreetpunk_kmu + '/src/js/common.js', // Custom scripts. Always at the end
			],
			dest:       base.newstreetpunk_kmu + '/js',
			output:     'scripts.min.js',
		},

		code: {
			src: [
				base.newstreetpunk_kmu  + '/**/*.{' + fileswatch + '}',
			],
		},

		forProd: [
			'/**',
			' * @author https://github.com/newstreetpunk',
			' * @editor https://github.com/alexsab',
			' */',
			''].join('\n'),
	},




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
	// .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
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
	// .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
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

	watch(projects.newstreetpunk_kmu.code.src).on('change', browserSync.reload);
};

exports.newstreetpunk_kmu_browsersync = newstreetpunk_kmu_browsersync;
exports.newstreetpunk_kmu_new = parallel(newstreetpunk_kmu_styles_new, newstreetpunk_kmu_scripts_new, newstreetpunk_kmu_browsersync, newstreetpunk_kmu_watch_new);
exports.newstreetpunk_kmu = parallel(newstreetpunk_kmu_styles, newstreetpunk_kmu_scripts, newstreetpunk_kmu_browsersync, newstreetpunk_kmu_watch);


/* newstreetpunk_kmu END */



