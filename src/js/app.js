// LIBS
require('../libs/Magnific-Popup-master/jquery.magnific-popup');
require('../libs/slick/slick');
require('../libs/animate/animate-css');
require('../libs/lazyload.min');
require('../libs/waypoint');
// MODULES
require('./modules/animations');
require('./modules/sliders');
require('./modules/form');
require('./modules/modals');
require('./map');

if ( $('div').is('.stages-block') ) {
	if ($('.stages-block').is('visible')) {
		$('.stages-border').addClass('active');
		$('.stages-item').addClass('fadeInRight').addClass('active').css('opcity', 1);
	}

	$(window).on('scroll', () => {
		let blockPosition = $('.stages-block').offset().top, 
			windowScrollPosition = $(window).scrollTop();

		if( blockPosition - $(window).height() < windowScrollPosition ) {
			$('.stages-border').addClass('active');
			$('.stages-item').addClass('fadeInRight').addClass('active').css('opcity', 1);
		}
	});
}

$('.mobile-btn').on('click', function() {
	$(this).toggleClass('active');
	$('.top-menu__list').slideToggle();
	$('.header').removeClass('active');
});

$('.sidebar-btn').on('click', function() {
	$(this).toggleClass('active');
	$('.widgets').slideToggle();
	$('.header').removeClass('active');
});

$('.mob-btn-header').on('click', function() {
	$('.mobile-btn').removeClass('active');
	$('.top-menu__list').slideUp();
	$('.header').toggleClass('active');
});

$('a.scroll').bind("click", function(e){
	var anchor = $(this);
	$('html, body').stop().animate({
		scrollTop: $(anchor.attr('href')).offset().top}, 700);
	e.preventDefault();
});

function myResize(){
	// ВЫСОТА
	var headerH = $('.header').height();
	var TopMenuH = $('#top-menu').height();
	var winH = $(window).height();
	var bannerSlideH = winH - 94;
	// ШИИРИНА
	var winW = $(window).width();
	var contW = $('.advantages .container').width();
	var padding = (winW - contW) / 2;
	
	if ($(window).width() > 768) {
		$('.banner-slide').css({
			'height': bannerSlideH,
			'padding-left': padding
		});

		$('.banner-form').css('right', padding);
	}
}

myResize();

$(window).resize(function(){
	myResize();
});

$('.top').click(function() {
	$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
});
$(window).scroll(function() {
	if ($(this).scrollTop() > $(window).height()) {
		$('.top').addClass("active");
	} else {
		$('.top').removeClass("active");
	};
});

$('.lazyload').lazyload();