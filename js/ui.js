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
		var $menu = $('.menu');

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
					// 컨테이너 기준 아이템 위치를 매번 실시간으로 계산
					var itemLeft = Math.round($(this).offset().left) - Math.round($menu.offset().left) + $menu.scrollLeft();
					$menu.scrollLeft(itemLeft);
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



// detailed tasks 더보기 토글
function detailedTasksInit() {
	var MAX_HEIGHT = 300;

	$('.detailed-tasks').each(function() {
		var $dl = $(this);
		var naturalHeight = $dl.outerHeight();

		if (naturalHeight <= MAX_HEIGHT) return;

		$dl.addClass('is-collapsed');

		var $btn = $('<span class="detailed-tasks-more">더보기 +</span>');
		$dl.after($btn);

		$btn.on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();

			if ($dl.hasClass('is-collapsed')) {
				$dl.removeClass('is-collapsed');
				$(this).text('접기 -');
			} else {
				$dl.addClass('is-collapsed');
				$(this).text('더보기 +');
				$('.btn_top').trigger('click');
			}

			// 높이 변화 후 그룹 위치·높이 재계산 및 메뉴 on 클래스 갱신
			nav.scrollTop();
			nav.scrollEffect();
		});
	});
}

// document ready
$(window).load(function() {
	layoutInit();
	nav.menuClick();
	nav.mobileSticky();
	btnTop.scroll();
	btnTop.btnClick();
	detailedTasksInit();
	// detailedTasksInit()으로 높이가 바뀐 후 그룹 위치·높이 재계산
	nav.scrollTop();
	nav.scrollEffect();
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
	nav.scrollTop();
	nav.scrollEffect();
	nav.mobileSticky();
	btnTop.scroll();
});