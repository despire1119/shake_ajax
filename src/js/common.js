(function(){
	var helper = {
		urlConcat: function(url, params){
			var hasParam = !(url.indexOf('?')<0);
			url += hasParam?'&':'?';
			if(typeof params === 'object'){
				Object.keys(params).forEach(function(item){
					url+=item+'='+params[item] + '&';
				});
			}
			url += 'callback=?';
			return url;
		},
		makeAjax: function(url, params, onSuccess, onFail, timeout){
			var timeout = timeout || 10000;
			var args = arguments;
			$.ajax({
				type: 'get',
				url: helper.urlConcat(url, params),
				async: true,
				timeout: timeout,
				dataType: 'jsonp',
				jsonpCallback: 'doneCallback'
			}).done(function(data){
				onSuccess(data);
			}).fail(function(jqXHR, statusText, errorThrown){
				if(statusText=='timeout'){
					console.log("%ctimeout", "color: red");
					jqXHR.abort();
					helper.makeAjax.apply(helper, args);
				}else{
					onFail(jqXHR);
				}
			});
		},
		dateFormat: function(date, format){
			var format = format || 'yyyy-MM-dd hh:mm:ss';
			Date.prototype.Format = function (fmt) {
			    var o = {
			        "M+": this.getMonth() + 1, //月份
			        "d+": this.getDate(), //日
			        "h+": this.getHours(), //小时
			        "m+": this.getMinutes(), //分
			        "s+": this.getSeconds(), //秒
			        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
			        "S": this.getMilliseconds() //毫秒
			    };
			    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			    for (var k in o)
			        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			    return fmt;
			};
			return date.Format(format);
		}
	};

	function doneCallback(){}


	window.helper = helper;

})();