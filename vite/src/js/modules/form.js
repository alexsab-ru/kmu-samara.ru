
$('input').each(function(){
	let id = $(this).attr('name');
	$(this).change(function(){
		$(this).closest('form').find('#'+id).text('').hide();
	})
})

function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
	"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	))
	return matches ? decodeURIComponent(matches[1]) : undefined
}


//E-mail Ajax Send
$("form").submit(function() { //Change
	var th = $(this);
	var btnSubmit = th.find('button[type="submit"]');
	btnSubmit.attr("disabled", true);
	var url = window.location.href;
	var addParam = '&referer=' + url.replace('?', '&');
	if(getCookie('fta')) {
		addParam += "&fta";
	}
	$.ajax({
		type: "POST",
		url: "https://alexsab.ru/lead/kmu/",
		data: th.serialize() + addParam,
	}).done(function( data ) {
		var res = JSON.parse(data);
		// console.log( ["success data:", data, res, res.error] );
		if(res.error) 
			$('.error-message').html(res.error);
		else
			$('.error-message').html("");
		if(res.answer == 'required'){
			th.find(res.field).text(res.message).show()
			btnSubmit.removeAttr("disabled");
			return;
		}
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