$(function(){

	var roomId = purl().param('roomId');

	var win = $('#win');
	var fail = $('#fail');
	var time = Date.now();
	var timestamp = time.toString().substring(time.length-10);

	// 获取cookie用户信息
	var localUser = Cookies.getJSON('user');


	// 根据openid获取用户游戏数据
	helper.makeAjax(g.fapi.userResult, {
		roomId: roomId,
		wxOpenId: localUser.wxOpenId
	}, function(room){
		var user = room.user[0];
		// 判断是否可以领奖
		$.ajax({
			type: 'get',
			url: g.api.isAward + '&openid='+user.wxOpenId+'&store_act_id='+room.storeActId+'&uuid='+roomId+'&callback=?',
			dataType: 'jsonp',
			success: function(data){
				if(data.start == 0){
					win.hide();
					fail.show();
					var total = parseInt(room.gameShakeNum);
					var shakeNum = parseInt(user.shakeCount);
					var percent = ((shakeNum/total) * 100).toFixed(2) * 1+'%';
					fail.find('.J-time').html(percent);
				}else{
					fail.hide();
					win.show();
					win.find('.J-rank').html(user.rank);
					win.find('.J-time').html(getTime(user.shakeCost));
					if(data.start == 1){
						var sendParams = [
							'openid='+user.wxOpenId,
							'store_act_id='+room.storeActId,
							'uuid='+roomId,
							'timestamp='+timestamp
						].join('&');
						win.attr('style','display:block');
						win.find('.J-get').show();
						$('#getAward').css('display', 'block');
						$('#getAward').on('click', function(e){
							e.preventDefault();
							var code = Cookies.get('code');
							var auth = g.auth;
							if(code!=='undefined'){
								auth = auth.replace('40005',4+''+code);
							}
							var link = auth + encodeURIComponent(g.awardRedirectUrl+'&'+sendParams);
							//alert(decodeURIComponent(link));
							window.location.href=link;
						});
					}else if(data.start == 3){
						win.find('.J-all-out').show();
					}else if(data.start == 4){
						win.find('.J-not-get').show();
					}else if(data.start == 5){
						win.find('.J-not-get').show();
					}
				}
				// 抽奖开启
				if(!!data.has_draw&&data.has_draw == 1 && (data.start == 0 || data.start == 2)){
					var link = g.api.draw+'&openid='+user.wxOpenId+'&store_act_id='+room.storeActId+'&uuid='+roomId;
					if(data.start == 0){
						fail.find('.btn-draw').css('display', 'block').attr('href', link);
					}else if(data.start == 2){
						win.find('.btn-draw').css('display', 'block').attr('href', link);
					}
				}
			}
		});
	}, function(){
		console.log('fail');
	});


	function getTime(shaking_time){
		var time;
        var second = Math.floor(shaking_time/1000);
        var mSecond = shaking_time-second*1000;
        if(mSecond>=10){
            mSecond = parseInt(mSecond/10);
            time=second+"秒"+mSecond;
        }else{
            time=second+"秒";
        }
        return time;
	}

    
});