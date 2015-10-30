$(function () {

    var roomId = $.url().param('roomId');


    helper.makeAjax(g.fapi.result, {
    	roomId: roomId
    }, function(data){
    	renderData(data);
    }, function(){
    	console.log('fail');
    });


    function renderData(data) {
        var html = '';
        var showMax = 11;
        var usersAll = data.user;
        var userNum = usersAll.length;
        var showNum = userNum>showMax?showMax: parseInt(data.screenUserNum);
        var users = data.user.slice(0, showNum);
        console.log(users.length);
        for (var i = 0; i < users.length; i++) {
            if (users[i].finishFlag == 'true') {
                num = i + 1;
                var time;
                var second = Math.floor(users[i].shakeCost / 1000);
                var mSecond = users[i].shakeCost - second * 1000;
                if (mSecond >= 10) {
                    mSecond = parseInt(mSecond / 10);
                    if (mSecond < 10) {
                        mSecond = "" + 0 + mSecond;
                    }
                    time = second + "秒" + mSecond + '';
                } else {
                    time = second + "秒";
                }
                html += '<div class="rank-list rank-list' + num + ' l">'
                    + '<div class="list">'
                    + '<em>' + num + '</em><div class="user-ifo">'
                    + '<div class="ph-frame"><img src="' + decodeURIComponent(users[i].wxPic) + '" alt="用户头像"></div>'
                    + '<div id="crown"></div><p>' + users[i].nickName + '</p><span>' + time + '</span></div></div></div>'
            }
        }
        $('#title').text(data.title);
        $('.rank').html(html);
        //var rankList = $('.rank-list');
        //var maxHeight=290;
        //rankList.each(function(index,ele){
        //    if(index==0){
        //        rankList.eq(0).find('.list').height(maxHeight);
        //    }else{
        //        var nowTime = users[index].shakeCost;
        //        var firstTime = users[0].shakeCost;
        //        rankList.eq(index).find('.list').height((firstTime/nowTime)*maxHeight);//高度
        //    }
        //});
        var pressNum = 1;
        window.onkeypress = function () {
            pressNum++;
            if (pressNum == 2) {
                var awardBg = document.getElementById('award');
                if (awardBg) {
                    awardBg.play();
                } //游戏背景音乐
            } else {
                window.location.href = g.tvEntranceUrl + '?id=' + data.storeActId;
            }
        };
    }

});
