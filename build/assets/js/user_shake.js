$(function () {
    var params = purl().param();
    var wx_pic = !params.wx_headimgurl?'./assets/images/wx_pic_default.jpg':params.wx_headimgurl;
    // var userInfo = {
    //     roomId: params.roomId,
    //     openid: params.wx_openid,
    //     nickname: params.wx_nickname,
    //     wx_pic: wx_pic,
    //     shaking_num: 0,
    //     ranking_num: 0,
    //     end: false
    // };
    // test
    var userInfo = {
        roomId: params.roomId,
        openid: 'openid123',
        nickname: 'zeron',
        wx_pic: wx_pic,
        shaking_num: 0,
        ranking_num: 0,
        shaking_time: 0,
        end: false
    };

    // 存储cookie
    Cookies.set('user', {
        openid: userInfo.openid
    });

    // TODO 新用户报名
    helper.makeAjax(g.fapi.join, userInfo, function(data){
        console.log(data);
    }, function(){
        console.log('fail');
    });
    
    // 摇动
    var shakeEvent = new Shake({
        threshold: 17
    });
    var shakeCount = 0;
    var start = false;
    shakeEvent.start();
    window.addEventListener('shake', function(){
        //shakeCount += Math.ceil(Math.random()*2);
        shakeYouPhone();
        if(start){
            shakeCount++;
        }else{
            // 获取状态
            console.log('游戏未开始');
        }
    }, false);

    // 间隔发送摇动次数到后台
    // setInterval(function(){
    //     if(!start){
    //         shakeCount = 0;
    //     }
    //     $.ajax({
    //         type: 'get',
    //         url: '',
    //         dataType: 'jsonp'
    //     }).done(function(data){
    //         // 游戏开始
    //         if(data.status == 101){
    //             start = true;
    //         }
    //     }).fail(function(){});
    // }, 1000);


    // var count = 0;
    // $('#trigger').on('click', function(){
    //     socket.emit('shake', {
    //         roomId: params.roomId,
    //         openid: params.openid,
    //         shaking_num: count++
    //     });
    // });



});
