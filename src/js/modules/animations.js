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