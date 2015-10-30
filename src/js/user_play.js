$(function () {
    var params = purl().param();
    var wxPic = !params.wx_headimgurl?'./assets/images/wx_pic_default.jpg':params.wx_headimgurl;
    var userInfo = {
        roomId: params.roomId,
        wxOpenId: params.wx_openid,
        nickName: params.wx_nickname,
        wxPic: wxPic
    };
    // // test
    // var userInfo = {
    //     roomId: params.roomId,
    //     wxOpenId: Date.now(),
    //     nickName: 'zeron',
    //     wxPic: wxPic
    // };

    // 存储cookie
    Cookies.set('user', {
        wxOpenId: userInfo.wxOpenId
    });

    // 存储门店编码
    Cookies.set('code', params.code);

    // TODO 新用户报名
    helper.makeAjax(g.fapi.join, userInfo, function(data){
        console.log(data);
    }, function(){
        console.log('fail');
    });

    var start = false;
    var end = false;
    var isShaking = false;
    var isPolling = false;
    // 检测游戏是否开始
    var checkInterval = setInterval(function(){
        helper.makeAjax(g.fapi.shake, {
            roomId: userInfo.roomId,
            wxOpenId: userInfo.wxOpenId,
            increment: 0
        }, function(data){
            if(data.status == 101){
                start = true;
                clearInterval(checkInterval);
            }else if(data.status == 102 || data.status == 103){
                start = true;
                end = true;
            }
        }, function(){
            console.log('fail');
        });
    }, 500);
    
    // 摇动
    var shakeEvent = new Shake({
        threshold: 17
    });
    
    var increment = 0;
    var tips = $('.game-tips');
    shakeEvent.start();
    window.addEventListener('shake', shakeHandler, false);
    function shakeHandler(){
        //shakeCount += Math.ceil(Math.random()*2);
        //isShaking = true;
        if(start){
            if(!isShaking){
                isShaking = true;
                shakeYouPhone();
                increment += Math.ceil(Math.random()*3);
                //发送数据
                helper.makeAjax(g.fapi.shake, {
                    roomId: userInfo.roomId,
                    wxOpenId: userInfo.wxOpenId,
                    increment: increment
                }, function(data){
                    if(data.finishFlag == 'true' || data.status == 102 || data.status == 103){
                        start = false;
                        end = true;
                        if(!isPolling){
                            loopForStatus();
                        }
                    }else{
                        increment = 0;
                    }
                    isShaking = false;
                }, function(){
                    console.log('fail');
                    isShaking = false;
                });
            }
        }else{
            // 获取状态
            if(!end){
                if(tips.hasClass('hide')){
                    tips.removeClass('hide');
                    setTimeout(function(){
                        tips.addClass('hide');
                    }, 2000);
                }
            }
            
        }
    }
    function loopForStatus(){
        isPolling = true;
        setInterval(function(){
            helper.makeAjax(g.fapi.shake, {
                roomId: userInfo.roomId,
                wxOpenId: userInfo.wxOpenId,
                increment: 0
            }, function(data){
                if(data.status == 103){           //数据存储完成
                    window.location.href = g.mResultUrl + '?roomId=' + userInfo.roomId;
                }
            }, function(){
                console.log('fail');
            });
        }, 1000);
    }

    // 摇动检测
    var shakeDetect = setInterval(function(){
        if(start&&!isShaking&&!isPolling){
            loopForStatus();
        }
    }, 2000);

    // test
    $('#trigger').on('click', function(){
        shakeHandler();
    });
});
