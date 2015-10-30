// global variables

var g = (function(){

	var env = 'local';

	var auths = {
		prd: 'http://mobts.suning.com/suning-web-mobile/weixin/auth.htm?weixinSnChannel=40005&weixinRedirectUrl=',
		pre: 'http://mobimsgpre.cnsuning.com/suning-web-mobile/weixin/auth.htm?weixinSnChannel=40005&weixinRedirectUrl=',
		sit: 'http://mobimsgsit.cnsuning.com/suning-web-mobile/weixin/auth.htm?weixinSnChannel=40005&weixinRedirectUrl=',
		local: 'http://mobimsgsit.cnsuning.com/suning-web-mobile/weixin/auth.htm?weixinSnChannel=40005&weixinRedirectUrl='
	};
	var wxapis = {
		sit: 'http://mobimsgsit.cnsuning.com/suning-web-mobile/weixin/public/requestUserInfo.htm?weixinRedirectUrl=',
		pre: 'http://mobimsgpre.cnsuning.com/suning-web-mobile/weixin/public/requestUserInfo.htm?weixinRedirectUrl=',
		prd: 'http://mobts.suning.com/suning-web-mobile/weixin/public/requestUserInfo.htm?weixinRedirectUrl=',
		local: 'http://mobimsgsit.cnsuning.com/suning-web-mobile/weixin/public/requestUserInfo.htm?weixinRedirectUrl='
	};
	var urlHosts = {
		local: 'http://10.25.16.171:3000/shake_ajax/build/',
		prd: 'http://res.suning.cn/project/cmsWeb/act/race/',
		sit: 'http://sitres.suning.cn/project/cmsWeb/act/race/'
	};
	var apiHosts = {
		prd: 'http://qing.suning.com/',
		sit: 'http://qingsit.cnsuning.com/',
		local: 'http://qingsit.cnsuning.com/'
	};
	// 页面实时交互api
	var fapiHosts = {
		prd: 'http://act.suning.com/act-wap-web/wap/storeGame/',
		sit: 'http://actsit.cnsuning.com/act-wap-web/wap/storeGame/',
		//local: 'http://10.25.3.230:8080/act-wap-web/wap/storeGame/'
		local: 'http://actsit.cnsuning.com/act-wap-web/wap/storeGame/'
	};

	return {
		wxapi: wxapis[env],
		api: {
			getActList: apiHosts[env]+'index.php?route=store/stroelistinfo',
			getActInfo: apiHosts[env]+'index.php?route=store/stroeactinfo',
			verifyAct: apiHosts[env]+'index.php?route=store/storecheck_code',
			saveData: apiHosts[env]+'index.php?route=store/store_attendinfo',
			lockTable: apiHosts[env]+'index.php?route=store/is_lock',
			unlockTable: apiHosts[env]+'index.php?route=store/is_unlock',
			isAward: apiHosts[env]+'index.php?route=store/usergetprize',
			updateActTime: apiHosts[env]+'index.php?route=store/upstroesess',
			draw: apiHosts[env] + 'index.php?route=store/draw'
		},
		fapi: {
			create: fapiHosts[env] + 'createStoreGame.do',
			getNumber: fapiHosts[env] + 'getPeopleCountByRoomId.do',
			join: fapiHosts[env] + 'storeGameSignUp.do',
			shake: fapiHosts[env] + 'sendUserShakeData.do',
			start: fapiHosts[env] + 'setStoreGameStatus.do',
			end: fapiHosts[env] + 'setStoreGameStatus.do',
			result: fapiHosts[env] + 'getRoomInfo.do',
			userResult: fapiHosts[env] + 'getUserInfoForRoom.do'
		},
		auth: auths[env],
		wxRedirectUrl: urlHosts[env]+'user_enter.html',
		awardRedirectUrl: apiHosts[env]+'index.php?route=store/UserLoginPrize',
		mWaitUrl: urlHosts[env]+'user_wait.html',
		mPlayUrl: urlHosts[env]+'user_play.html',
		mResultUrl: urlHosts[env]+'user_result.html',
		tvRaceUrl: urlHosts[env]+'tv_play.html',
		tvResultUrl: urlHosts[env]+'tv_result.html',
		tvEntranceUrl: urlHosts[env]+'tv_detail.html',
		transferUrl: urlHosts[env]+'1.html'
	}
})();