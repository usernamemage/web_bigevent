$(function () {
    getUserInfo();

    // 退出功能
    $('#loginOut').on('click', function () {
        layui.layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = 'login.html';
            layui.layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: 'my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function (res) {
            if (res.status != 0) {
                return layui.layer.msg(res.message);
            }
            renderAvatar(res.data);
        }
    })
}

function renderAvatar(user) {
    var uname = user.nickname || user.username;
    $('.text-inner').html('欢迎&nbsp;&nbsp;' + uname);
    if (user.user_pic != null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').html(uname[0].toUpperCase()).show();
    }
}