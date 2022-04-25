// 每次发起ajax请求时，会提前调用ajaxPrefilter函数，可以拿到我们给ajax配置的参数对象
$.ajaxPrefilter(function(options) {
    // 发起ajax请求前，进行拼接路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    // 发起ajax请求前，统一为有权限的接口 配置headers请求头拼接
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || " "
        }
    }
    // 统一挂载complete
    options.complete = function(res) {
        // complete回调函数中，通过res.responseJSON获得服务器响应的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 1.强制清除token
            localStorage.removeItem('token')
                // 2.强制跳转登录页面
            location.href = "/login.html"
        }

    }
})