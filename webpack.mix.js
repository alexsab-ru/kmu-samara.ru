let mix = require('laravel-mix');

mix.autoload({
  jquery: ['$', 'jQuery', 'window.jQuery'],
  moment: 'moment'
});

mix
  .js([
    'src/libs/Magnific-Popup-master/jquery.magnific-popup.js',
    'src/libs/slick/slick.js',
    'src/libs/animate/animate-css.js',
    'src/libs/lazyload.min.js',
    'src/libs/waypoint.js',
    'src/js/map.js',
    'src/js/common.js',
    'src/js/app.js',
    ], 'js/scripts.min.js')
  .sass('src/sass/styles.sass', 'css')

if (mix.inProduction()) {
  mix.version();
} else {
  // mix.sourceMaps().webpackConfig({ devtool: 'inline-source-map' });
  mix.browserSync({
    proxy: '127.0.0.1:4000',
    notify: false,
    open: true,
    port: 3000 ?? 80,
    // files: ['_site/**/*.*'],
  });
}

mix.disableSuccessNotifications();