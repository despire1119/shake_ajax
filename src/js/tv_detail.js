$(function(){

	'use strict';

	var params = $.url().param();
	var storeActId = params.id;
	var roomId = 0;
	var code = Cookies.get('code');

	if(code==='undefined'&&params.code){
		code = params.code;
	}



	//获取活动信息
	helper.makeAjax(g.api.getActInfo, {
		id: storeActId
	}, function(dataAct){
		// 创建游戏
		helper.makeAjax(g.fapi.create, {
			title: dataAct.title,
			gameShakeNum: dataAct.game_shake_num,
			screenUserNum: dataAct.screen_user_num,
			storeActId: storeActId,
			status: 100
		}, function(data){
			roomId = data.roomId;
			console.log(roomId);
			generateQRCode();
			renderAct(dataAct);
			getNumber();
		}, function(){
			console.log('fail');
		});
	}, function(){
		console.log('fail');
	});

	// 生成二维码
	function generateQRCode(){
		//var qrcodeUrl = g.wxapi + encodeURIComponent(g.wxRedirectUrl + '?roomId=' + roomId);
		var qrcodeUrl = g.transferUrl + '?roomId='+roomId+'&code='+code;
		// 生成二维码
		$('#qrcode').qrcode({
			width: 310,
			height: 310,
			text: qrcodeUrl
		});
	}

	//页面显示数据
	function renderAct(data){
		var awards = data.awards;
		//规则
		$('#actRule').html(data.game_rule_dec);
		$('#title').text(data.title);
		//奖品
		var html = '';
		awards.forEach(function(item, index, arr){
			var rank = item.rank_start === item.rank_end?item.rank_start: item.rank_start + '-' + item.rank_end;
			html += [
				'<div class="l">',
				'<img src="'+item.gift_pic+'" alt="奖品">',
				'第<span>'+rank+'</span>名',
				'</div>'
			].join('');
		});
		$('#awards').html(html);

		// 开始跳转
		$(document).keydown(function(e){
	        if(e.keyCode == 13){
	            window.location.href = g.tvRaceUrl + '?roomId=' + roomId;
	        }
	    });

	    // cookie存储活动信息
	    Cookies.set('act', data);
	}


	// 获取报名人数
	function getNumber(){
		var elJoinNumber = $('#joinNumber');
		setInterval(function(){
			helper.makeAjax(g.fapi.getNumber, {
				roomId: roomId
			}, function(data){
				elJoinNumber.text(data.partiPeople);
			}, function(){
				console.log('fail');
			});
		}, 500);
	}
	



});
