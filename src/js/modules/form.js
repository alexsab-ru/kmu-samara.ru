//E-mail Ajax Send
$("form").submit(function() { //Change
	var th = $(this);
	var btnSubmit = th.find('button[type="submit"]');
	btnSubmit.attr("disabled", true);
	var url = window.location.href;
	var replUrl = url.replace('?', '&');
	$.ajax({
		type: "POST",
		// url: "//alexsab.ru/lead/kmu/",
		// url: "//alexsab.ru/lead/dev/",
		url: "https://diywebdev.ru/send/",
		data: th.serialize() +'&referer=' + replUrl,
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