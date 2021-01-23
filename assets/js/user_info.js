$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: [
            /^[\S]{1,6}$/,
            '用户昵称应在1~6位之间'
        ]
    })

    getUserInfo();

    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: 'my/userinfo',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // layui快速给表单赋值 需要给对应form表单添加lay-filter属性
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置功能呢
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        getUserInfo();
    })

    // 更新用户信息
    $('#formUserInfo').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: 'my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                // 调用父组件index里面的方法 更新欢迎语
                window.parent.getUserInfo()
            }
        })
    })
})