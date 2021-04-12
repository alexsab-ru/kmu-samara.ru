jQuery(function($) {

	if ( $('div').is('.stages-block') ) {
		if ($('.stages-block').is('visible')) {
			$('.stages-border').addClass('active');
			$('.stages-item').addClass('fadeInRight').css('opcity', 1);
		}

		$(window).on('scroll', () => {
			let blockPosition = $('.stages-block').offset().top, 
			windowScrollPosition = $(window).scrollTop();

			if( blockPosition - $(window).height() < windowScrollPosition ) {
				$('.stages-border').addClass('active');
				$('.stages-item').addClass('fadeInRight').css('opcity', 1);
			}
		});
	}

	// Animations
	// Снизу вверх
	$("section h1, section h2, h2+.descr, \
		.offer-form, \
		.benefit, \
		.replacement-form, \
		section h1 span, \
		section h2 span, \
		.f-table, \
		.model-nav, \
		.reviews__link, \
		.service__item:nth-child(odd), \
		.service__item:nth-child(even), \
		.service2__item, \
		.article ")
		.animated("fadeInUp", "fadeInUp");

	// Слева направо
	$(".subtitle, \
		.maps .dealer:nth-child(odd) .dealer-info")
		.animated("fadeInLeft", "fadeInLeft");

	// Справа налево
	$(".banner-form, \
		.maps .dealer:nth-child(even) .dealer-info, \
		.advantages__item, \
		.order__item, \
		.order__list .dot, \
		aside")
		.animated("fadeInRight", "fadeInRight");
	// Animations End

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

	$('.reviews__letter--img a').magnificPopup({
		type: 'image',
		closeOnContentClick: true		
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


	$('.reviews-video-link').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: true
	});

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
	
	// $("section h2").each(function(){
	// 	var th = $(this);
	// 	var lengthWords = th.text().split(' ').length - 1;
	// 	if(lengthWords == 1)
	// 		th.html(th.html().replace(/^\s*([^\s]+)(\s|$)/, '<span>$1</span> '));
	// 	else
	// 		th.html(th.html().replace(/\s([\S]+)$/, ' <span>$1</span>'));
	// });

	$('a[href*=#].scroll').bind("click", function(e){
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

	//E-mail Ajax Send
	$("form").submit(function() { //Change
		var th = $(this);
		var btnSubmit = th.find('button[type="submit"]');
		btnSubmit.attr("disabled", true);
		var url = window.location.href;
		var replUrl = url.replace('?', '&');
		$.ajax({
			type: "POST",
			url: "//alexsab.ru/lead/kmu/",
			data: th.serialize() +'&referer=' + replUrl
		}).done(function( data ) {
			var res = JSON.parse(data);
			// console.log( ["success data:", data, res, res.error] );
			if(res.error) 
				$('.error-message').html(res.error);
			else
				$('.error-message').html("");
			setTimeout(function() {
				$.magnificPopup.close();
				$.magnificPopup.open({
					items: {
						src: (res.answer == 'OK') ? '.thanks' : '.error',
						type: 'inline'
					}
				});
				if(res.answer == 'OK') {
					th.trigger("reset");
				}
				btnSubmit.removeAttr("disabled");
			}, 100);
		}).fail(function( jqXHR, textStatus ) {
			$('.error-message').html("Request failed: " + textStatus);
			setTimeout(function() {
				$.magnificPopup.close();
				$.magnificPopup.open({
					items: {
						src: '.error',
						type: 'inline'
					}
				});
				btnSubmit.removeAttr("disabled");
			}, 100);
		});
		return false;
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

	$('.modal-link').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		preloader: false,
	});

	$('a.popup').each(function(){

		$(this).click(function(){
			var atr = $(this).attr('href');
			$('.overlay').show();
			$('.privacy-wrap').show();
			$('html').css({
				'margin-right': '17px',
				'overflow': 'hidden'
			});

			if ( atr === '#popup' ) {
				$('.privacy').show();
			}else{
				var parent = $(this).closest('.service__item'),
					title = parent.find('h3').text(),
					price = parent.find('.price').text(),
					descr = parent.find('.descr').text(),
					image = parent.find('img').data('src'),
					modal = $('.info-modal');

				modal.find('img').attr({'src': image, 'alt': title.replace(/"/g, '')});
				modal.find('h2').text(title);
				modal.find('.price').text(price);
				modal.find('p').text(descr);
				modal.find('.modal-link').attr('data-title', title);

				modal.show();

				modal.find('.modal-link').click(function(){
					$('.overlay').hide();
					$('.privacy-wrap').hide();
					$('.info-modal').hide();
				});

			}

			return false;
		});

	});
	$('.overlay, .privacy-close').on('click', function(){
		$('.overlay').hide();
		$('.privacy-wrap').hide();
		$('.privacy').hide();
		$('.info-modal').hide();
		$('html').removeAttr('style');
	});

	$('a[href="#cheaper"]').on('click', function(){
		var servName = $(this).data('title');
		if(servName) 
			$('#cheaper').find('h3').text(servName);
		else
			$('#cheaper').find('h3').text($(this).text());

	});

	$('a[href="#callbackForm"]').on('click', function(){
		var title = $(this).data('title');
		if(title) 
			$('#callbackForm').find('h2').text(title);
		else
			$('#callbackForm').find('h2').text($(this).text());
		if ($(this).hasClass('discounts__item')) {
			var text = $(this).find('.discounts__item--text').text();

			$('#callbackForm').find('input[name="Форма"]').val('Акция. ' + text);
			$('#callbackForm').find('p').text('Чтобы воспользоваться акцией, оставьте свои данные и мы свяжемся с Вами в ближайшее время!');

		}

	});

	$('a[href="#orderForm"]').on('click', function(){
		var title = $(this).data('title');
		$('#orderForm').find('h2').text(title);
		$('#orderForm').find('.service').val(title.replace(/"/g,''));
	});

	$('.lazyload').lazyload();

});