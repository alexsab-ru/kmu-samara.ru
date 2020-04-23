jQuery(function($) {

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

	$('.mobile-btn').on('click', function() {
		$(this).toggleClass('active');
		$('.top-menu__list').slideToggle();
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

	var arrow = '<svg version="1.1" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"	y="0px" viewBox="0 0 51.2 100" xml:space="preserve"><path fill-rule="evenodd" fill="#0887FC" d="M51.2,90c-0.6-1.3-1.4-2.8-2.4-4.3C23,44.5,23,55.5,48.8,14.3c1-1.5,1.8-3,2.4-4.3 c-0.8,1.6-1.9,3.4-3.2,5.2C42.7,22.5,25.9,42,25.9,50c0,8,16.8,27.5,22.1,34.8C49.3,86.6,50.4,88.4,51.2,90L51.2,90z"/><path fill-rule="evenodd" fill="#31618C" d="M36.1,6.9c-9.2,9-35.5,30-36.1,42.1c-0.7,13.7,26,34.1,36.1,44	c13.3,13,19.2,6.1,9.4-7.4c-5.9-8.2-23-27.1-22.5-36.6c0.4-7.7,17.3-27.5,22.5-34.7C55.3,0.8,49.4-6.1,36.1,6.9L36.1,6.9z"/><path fill-rule="evenodd" fill="#39739E" d="M50.2,98.2c0.8-2.3-0.5-6.9-4.7-12.6c-5.9-8.2-23-27.1-22.5-36.6 c0.4-7.7,17.3-27.5,22.5-34.7C49.6,8.6,51,4.1,50.2,1.8C36.7,14.1,11.4,35.7,10.7,48.8C9.9,63.7,35.9,85.3,50.2,98.2L50.2,98.2z"/></svg>';
	var arrow2 = '<svg version="1.1" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 41.2 100" xml:space="preserve"><path fill-rule="evenodd" fill="#39739E" d="M41,100c0.9-2.4-0.5-7.1-4.8-13C30,78.5,12.2,58.9,12.7,49c0.4-8,18-28.6,23.4-36 C40.4,7.1,41.8,2.4,41,0C26.9,12.8,0.7,35.2,0,48.8C-0.8,64.2,26.1,86.5,41,100L41,100z"/></svg>';

	$('.banner-slider').slick({
		autoplay: true,
		adaptiveHeight: true,
		arrows: true,
		dots: false,
		prevArrow: '<button class="arrow prev-arrow">'+arrow2+'</button>',
		nextArrow: '<button class="arrow next-arrow">'+arrow2+'</button>',
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
	$("h1, .subtitle, .maps .dealer:nth-child(odd) .dealer-info").animated("fadeInLeft", "fadeInLeft");
	$(".banner-form, .maps .dealer:nth-child(even) .dealer-info, .advantages__item").animated("fadeInRight", "fadeInRight");

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

	$('a[href="#popup"]').on('click', function(){
		$('.overlay').show();
		$('.privacy-wrap').show();
		$('html').css({
			'margin-right': '17px',
			'overflow': 'hidden'
		});
		return false;
	});
	$('.overlay, .privacy-close').on('click', function(){
		$('.overlay').hide();
		$('.privacy-wrap').hide();
		$('html').removeAttr('style');
	});

	$('.lazyload').lazyload();

	//при клике на заголовок ТО
	/* */
	$('.services-item__title').on('click', function(){
		var th = $(this);
		var id = th.attr('id');
		var parent = th.parent();
		// th.closest('.services-item').find('.services-item__car').removeClass('active');
		th.closest('.services-item').find('.serv-table').slideUp(100);

		if (parent.hasClass('active')) {
			parent.removeClass('active');
			th.closest('.services-item').find('.serv-table').removeClass('active');
			th.next().slideUp(100);
		}else{
			th.closest('.services-item').find('.services-item').removeClass('active');
			// th.closest('.services-item').find('.services-item__car--list').slideUp(100);
			parent.addClass('active');
			th.next().slideDown(300);
		}
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

	});

});