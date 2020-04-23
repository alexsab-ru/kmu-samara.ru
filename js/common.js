jQuery(function($) {

	var arrow = '<svg version="1.1" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 41.2 100" xml:space="preserve"><path fill-rule="evenodd" fill="#39739E" d="M41,100c0.9-2.4-0.5-7.1-4.8-13C30,78.5,12.2,58.9,12.7,49c0.4-8,18-28.6,23.4-36 C40.4,7.1,41.8,2.4,41,0C26.9,12.8,0.7,35.2,0,48.8C-0.8,64.2,26.1,86.5,41,100L41,100z"/></svg>';

	$('.banner-slider').slick({
		autoplay: true,
		adaptiveHeight: true,
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

	$('.mobile-btn').on('click', function() {
		$(this).toggleClass('active');
		$('.top-menu__list').slideToggle();
	});

	$("section h2").each(function(){
		var th = $(this);
		th.html(th.html().replace(/^\s*([^\s]+)(\s|$)/, '<span>$1</span> '));
	});

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
		var bannerSlideH = winH - (headerH+TopMenuH);
		// ШИИРИНА
		var winW = $(window).width();
		var contW = $('.container').width();
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
		$.ajax({
			type: "POST",
			url: "/kia/inc/mail.php", //Change
			data: th.serialize()
		}).done(function() {
			setTimeout(function() {
				$.magnificPopup.close();
				$.magnificPopup.open({
					items: {
						src: '.thanks',
						type: 'inline'
					}
				});
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	$("section h2, h2+.descr, .offer-form, .benefit, .replacement-form, section h2 span").animated("fadeInUp", "fadeInUp");
	$("h1, .subtitle, .maps .dealer:nth-child(odd) .dealer-info, .service__item:nth-child(odd)").animated("fadeInLeft", "fadeInLeft");
	$(".banner-form, .maps .dealer:nth-child(even) .dealer-info, .advantages__item, .service__item:nth-child(even)").animated("fadeInRight", "fadeInRight");

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
					image = parent.data('srcbefore'),
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

	$('.lazyload').lazyload();

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

	});

	$('a[href="#orderForm"]').on('click', function(){
		var title = $(this).data('title');
		$('#orderForm').find('h2').text(title);
		$('#orderForm').find('input[name="form_subject"]').val('Заказ услуги. ' + title.replace(/"/g,''));
	});


});