$(function () {


    var roomId = $.url().param('roomId');
    var firstClick = false;

    // 进入页面加载用户数据
    helper.makeAjax(g.fapi.result, {
        roomId: roomId
    }, function (data) {
        reciving = false;
        var users = data.user.slice(0, data.screenUserNum);
        hudongtv.beginGame(users, data.gameShakeNum, data.screenUserNum, end);
    }, function (error) {
        console.log(error.statusText);
    }, 2000);


    window.onkeypress = function () {
        if (!firstClick) {
            firstClick = true;
            hudongtv.countDown(function () {
                // 开始游戏
                helper.makeAjax(g.fapi.start, {
                    roomId: roomId,
                    status: 101
                }, function (data) {
                    console.log('game start');
                    begin();
                }, function () {
                    console.log('fail');
                });
            });
        } else {
            var raceBg = document.getElementById('race');
            if (raceBg) {
                raceBg.play();
            }//游戏背景音乐
        }
    };

    // 获取广告图
    var act = Cookies.getJSON('act');
    var imgList = $('#imgList').find('img');
    imgList.each(function (index, item) {
        item.src = act['advert_' + (index + 1)];
    });

    // 间隔获取游戏数据
    var reciving = false;
    var endFlag = true;
    var endNum = 0;//实际完成
    var calling = false;
    var act_roomId = 0;
    var act_shakeNum = 0;


    function begin() {
        setInterval(function () {
            if (!reciving) {
                reciving = true;
                helper.makeAjax(g.fapi.result, {
                    roomId: roomId
                }, function (data) {
                    reciving = false;
                    var users = data.user.slice(0, data.screenUserNum);
                    users.forEach(function (item) {
                        if (parseInt(item.shakeCount) == data.gameShakeNum) {
                            endNum += 1;
                        }
                    });
                    endFlag = endNum == users.length ? true : false;
                    if (!endFlag) {
                        endNum = 0;
                        hudongtv.beginGame(users, data.gameShakeNum, data.screenUserNum, end);
                    } else {
                        if (!calling) {
                            calling = true;
                            end();
                        }
                    }
                }, function (error) {
                    console.log(error.statusText);
                    reciving = true;
                }, 300);
            }
        }, 300);
    }




    $(document).keydown(function (e) {
        var button = e.keyCode;
        //强制结束
        if (button == 39) {
            // 强制结束游戏
            end();
        }
    });

    function end() {
        helper.makeAjax(g.fapi.end, {
            roomId: roomId,
            status: 102
        }, function (data) {
            console.log('game end');
            act_roomId = roomId;
            act_shakeNum = g.tvEntranceUrl;

            setTimeout(skip,2500);
        }, function () {
            console.log('fail');
        });
    }

    //function skip() {
    //    var minDistanc = 0;
    //    var userIn = $('.user :visible');
    //    for (var i = 0; i < userIn.length(); i++) {
    //        userIn.eq(i).attr(left) < userIn.eq(i + 1).attr(left) ? minDistanc = userIn.eq(i + 1).attr(left) : minDistanc = userIn.eq(i).attr(left);
    //    }
    //    if (minDistanc >= 1345) {
    //        window.location.href = act_shakeNum + '?roomId=' + act_roomId;
    //    }
    //}

    function skip(){
        window.location.href = g.tvResultUrl+'?roomId='+roomId;
    }

});
