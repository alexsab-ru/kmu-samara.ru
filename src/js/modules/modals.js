$('.reviews__letter--img a').magnificPopup({
type: 'image',
closeOnContentClick: true		
});

$('.reviews-video-link').magnificPopup({
disableOn: 700,
type: 'iframe',
mainClass: 'mfp-fade',
removalDelay: 160,
preloader: false,
fixedContentPos: true
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