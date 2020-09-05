		scripts: {
			src: [
				base.kmu + '/libs/jquery/dist/jquery.min.js',
				base.kmu + '/libs/Magnific-Popup-master/jquery.magnific-popup.js',
				'node_modules/slick-carousel/slick/slick.js',
				base.kmu + '/libs/animate/animate-css.js',
				base.kmu + '/libs/lazyload.min.js',
				base.kmu + '/libs/waypoint.js',
				base.kmu + '/js/map.js',
				base.kmu + '/js/common.js', // Custom scripts. Always at the end
			],
			dest:       base.kmu + '/js',
			output:     'scripts.min.js',
		},