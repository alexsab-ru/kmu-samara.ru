jQuery(function($) {

	var h_hght = 100; // высота шапки
	var h_mrg = 0;    // отступ когда шапка уже не видна


	var elem = $('#top-menu');
	var top = $(this).scrollTop();

	if(top > h_hght){
		elem.css('top', h_mrg);
	}           

	$(window).scroll(function(){
		top = $(this).scrollTop();

		if (top+h_mrg < h_hght) {
			elem.css({
				'top': h_hght - top,
				'box-shadow': 'none'
			});
		} else {
			elem.css({
				'top': h_mrg,
				'box-shadow': '0 15px 50px rgba(49,97,140, .3)'
			});
		}
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

	$("section h2, h2+.descr, .offer-form, .benefit, .replacement-form").animated("fadeInUp", "fadeInUp");
	$("h1, .subtitle, .maps .dealer:nth-child(odd) .dealer-info").animated("fadeInLeft", "fadeInLeft");
	$(".hero-form, .maps .dealer:nth-child(even) .dealer-info").animated("fadeInRight", "fadeInRight");

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