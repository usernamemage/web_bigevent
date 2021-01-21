// 在执行ajax请求前，会先执行ajaxPrefilter这个函数，option获取ajax请求的所有配置项
$.ajaxPrefilter(function (option) {
    option.url = 'http://api-breakingnews-web.itheima.net/' + option.url
    // 为需要使用权限验证的接口统一设置headers, 避免每次调用接口都写headers
    if (option.url.indexOf('/my') != -1) {
        option.headers = {
            Authorization: localStorage.getItem('token')
        }
    }
    option.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})