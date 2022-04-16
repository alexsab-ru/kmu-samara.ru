// стрелки для слайдеров
var arrow = '<svg version="1.1" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 41.2 100" xml:space="preserve"><path fill-rule="evenodd" fill="#39739E" d="M41,100c0.9-2.4-0.5-7.1-4.8-13C30,78.5,12.2,58.9,12.7,49c0.4-8,18-28.6,23.4-36 C40.4,7.1,41.8,2.4,41,0C26.9,12.8,0.7,35.2,0,48.8C-0.8,64.2,26.1,86.5,41,100L41,100z"/></svg>';
var arrow2 = '<svg width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.35929 12.9725L12.2089 2.97248L23.0586 12.9725" stroke="#35628A" stroke-width="4"/></svg>';

//Banner Slider
$('.banner-slider').slick({
	autoplay: true,
	arrows: true,
	dots: false,
	prevArrow: '<button class="arrow prev-arrow">'+arrow+'</button>',
	nextArrow: '<button class="arrow next-arrow">'+arrow+'</button>',
	responsive: [
	{
		breakpoint: 992,
		settings: {
			arrows: false,
			dots: true
		}
	}
	]
});

// Model Slider
$('.model__slider--wrap').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	// fade: true,
	adaptiveHeight: true,
	asNavFor: '.model__slider--nav'
});
$('.model__slider--nav').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	asNavFor: '.model__slider--wrap',
	// dots: true,
	// centerMode: true,
	focusOnSelect: true
});

// Gallery Slider
$('.gallery__slider').slick({
	// infinite: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
	prevArrow: '<button class="arrow prev-arrow">'+arrow+'</button>',
	nextArrow: '<button class="arrow next-arrow">'+arrow+'</button>',
	dots: false,
	fade: true,
	adaptiveHeight: true,
	asNavFor: '.gallery__nav'
});

$('.gallery__nav').slick({
	// infinite: false,
	slidesToShow: 8,
	slidesToScroll: 1,
	asNavFor: '.gallery__slider',
	// dots: true,
	// centerMode: true,
	focusOnSelect: true,
	responsive: [
	{
		breakpoint: 768,
		settings: {
			slidesToShow: 4,
			slidesToScroll: 1,
		}
	}
	]
});

//Reviews Text Slider
$('.reviews-text-slider').slick({
	slidesToShow: 2,
	slidesToScroll: 1,
	arrows: true,
	dots: false,
	prevArrow: '<button class="arrow prev-arrow">'+arrow2+'</button>',
	nextArrow: '<button class="arrow next-arrow">'+arrow2+'</button>',
	adaptiveHeight: true,
	responsive: [
	{
		breakpoint: 768,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: false,
		}
	}
	]
});

$('span.rating').each(function(){
	let star = +$(this).data('star');
	for (var i = 0; i < star; i++) {
		$(this).children('.star:eq('+ i +')').addClass('active');
	}
});

//Reviews Video Slider
$('.reviews-video-slider').slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	arrows: true,
	dots: false,
	prevArrow: '<button class="arrow prev-arrow">'+arrow2+'</button>',
	nextArrow: '<button class="arrow next-arrow">'+arrow2+'</button>',
	responsive: [
	{
		breakpoint: 992,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 1,
		}
	},
	{
		breakpoint: 768,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
		}
	}
	]
});

// Letter Slider
$('.reviews__letter').slick({
	slidesToShow: 2,
	slidesToScroll: 1,
	arrows: false,
	dots: true,
	prevArrow: '<button class="arrow prev-arrow">'+arrow2+'</button>',
	nextArrow: '<button class="arrow next-arrow">'+arrow2+'</button>',
	adaptiveHeight: true,
	responsive: [
	{
		breakpoint: 992,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: false,
		},
		breakpoint: 576,
		settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: false,
			autoplay: true
		}
	}
	]
});
//Price Slider
$('.model-nav.model-nav-two ul').slick({
	slidesToShow: 8,
	slidesToScroll: 4,
	arrows: false,
	dots: true,
	prevArrow: '<button class="arrow prev-arrow">'+arrow+'</button>',
	nextArrow: '<button class="arrow next-arrow">'+arrow+'</button>',
	responsive: [
	{
		breakpoint: 992,
		settings: {
			slidesToShow: 6,
			slidesToScroll: 3,
		}
	},
	{
		breakpoint: 768,
		settings: {
			slidesToShow: 4,
			slidesToScroll: 2,
		}
	},
	{
		breakpoint: 576,
		settings: {
			slidesToShow: 3,
			slidesToScroll: 3,
		}
	},
	{
		breakpoint: 480,
		settings: {
			slidesToShow: 2,
			slidesToScroll: 2,
		}
	}
	]
});