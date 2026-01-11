// layout
function layoutInit() {
	var bodyType;

	if($(window).width() < 769){
		bodyType = 'mo';
	} else {
		bodyType = 'pc'
	}
	$('body').attr('class' , bodyType);
}

// nav
var groupTop = [];
var groupHeight = [];
var mobileMenuWeight = [];

var nav = {
	scrollTop : function() {
		var group = $('.contents > .group');

		group.each(function(idx) {
			var boxTop = Math.round(group.eq(idx).offset().top); // group별 스크롤 위치
			var boxHeight = Math.round(group.eq(idx).outerHeight()); // group별 박스 높이값

			groupTop[idx] = boxTop;
			groupHeight[idx] = boxHeight;
		});
	},
	menuClick : function() {
		var menuList = $('.menu li');

		menuList.each(function(idx) {
			$(this).click(function(e) {
				e.preventDefault();
				if ($('body').hasClass('pc')) {
					scrollSmooth(groupTop[idx], 269);
				} else if ($('body').hasClass('mo')) {
					scrollSmooth(groupTop[idx], 68);
				}
			})
		});
	},
	scrollEffect : function() {
		var menuList = $('.menu li');

		menuList.each(function(idx) {
			var fromTop = $(window).scrollTop();

			if ($('body').hasClass('pc')) {
				if (groupTop[idx] - 269 <= fromTop && groupTop[idx] + groupHeight[idx] - 269 > fromTop) {
					$(this).addClass('on');
				} else {
					$(this).removeClass('on');
				}
			} else if ($('body').hasClass('mo')) {
				if (groupTop[idx] - 68 <= fromTop && groupTop[idx] + groupHeight[idx] - 68 > fromTop) {
					$(this).addClass('on');
					$('.menu').scrollLeft(mobileMenuWeight[idx] - 30);
				} else {
					$(this).removeClass('on');
				}
			}
		});
	},
	mobileSticky : function() {
		var moNav = $('nav');
		var navScrollTop = moNav.offset().top;
		var fromTop = $(window).scrollTop();

		if ($('body').hasClass('mo')) {
			if (navScrollTop < fromTop) {
				moNav.addClass('sticky');
			} else if (fromTop <= 96) {
				$('.mo .menu li').eq(0).addClass('on');
				moNav.removeClass('sticky');
			} else if (fromTop <= 116) {
				$('.mo .menu li').eq(0).addClass('on');
			}
		}
	},
	mobileMenuSetting : function() {
		var menuList = $('.menu li');

		if ($('body').hasClass('mo')) {
			menuList.each(function(idx) {
				var listPosition = Math.round(menuList.eq(idx).offset().left);
				mobileMenuWeight[idx] = listPosition;
				//console.log(mobileMenuWeight[idx])
			})
		}
	}
}

// top button
var btnTop = {
	scroll : function() {
		var fromTop = $(window).scrollTop();
		var btnTop = $('.btn_top');

		if (fromTop > 300) {
			btnTop.fadeIn();
		} else {
			btnTop.fadeOut();
		}
		//console.log(fromTop);
	},
	btnClick : function() {
		var btnTop = $('.btn_top');

		btnTop.click(function() {
			scrollSmooth(0, 0);
		});
	}
}

// scroll smooth
function scrollSmooth(value, minusNum) {
	$('html, body').animate({
		scrollTop: value - minusNum
	}, 400);
	return false;
}



// document ready
$(window).load(function() {
	layoutInit();
	nav.scrollTop();
	nav.mobileMenuSetting();
	nav.menuClick();
	nav.mobileSticky();
	btnTop.scroll();
	btnTop.btnClick();
});

// window.scroll
$(window).scroll(function() {
	nav.scrollEffect();
	nav.mobileSticky();
	btnTop.scroll();
});

// window resize
$(window).resize(function() {
	layoutInit();
	nav.mobileMenuSetting();
	nav.scrollTop();
	nav.scrollEffect();
	nav.mobileSticky();
	btnTop.scroll();
});