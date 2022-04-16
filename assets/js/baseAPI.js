// 每次发起ajax请求时，会提前调用ajaxPrefilter函数，可以拿到我们给ajax配置的参数对象
$.ajaxPrefilter(function(options) {
    // 发起ajax请求前，进行拼接路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})