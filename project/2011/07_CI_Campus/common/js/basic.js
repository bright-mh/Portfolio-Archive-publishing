$(document).ready(function() {
	$('.si_box').css('display', 'none');
});

/* 메인 바로가기 list */
function short_cut(a) {
	if (a == "01") {
		$('.short_cut_list a').removeClass("on");
		$('.short_cut_list_01 a').addClass("on");
		$('.short_cut_details > ul').animate({top:0},500);
	}
	else if (a == "02") {
		$('.short_cut_list a').removeClass("on");
		$('.short_cut_list_02 a').addClass("on");
		$('.short_cut_details > ul').animate({top:-93},500);
	}
	else if (a == "03") {
		$('.short_cut_list a').removeClass("on");
		$('.short_cut_list_03 a').addClass("on");
		$('.short_cut_details > ul').animate({top:-186},500);
	}
	else if (a == "04") {
		$('.short_cut_list a').removeClass("on");
		$('.short_cut_list_04 a').addClass("on");
		$('.short_cut_details > ul').animate({top:-279},500);
	}
}

$(document).ready(function() {
/* 메인 레이어 팝업 보이기 */
	$('.si_list p.btn a').click(function() {
		$('.si_box').css('display', 'none');
		$(this).parent().next().css('display','block');
	});

/* 메인 레이어 팝업 닫기 */
	$('.si_list p.btn_close a').click(function() {
		$('.si_box').css('display', 'none');
	});
});