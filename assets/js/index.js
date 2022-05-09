$(function() {
    // 调用函数getUserInfo，获取用户信息
    getUserInfo()


    // 绑定绑定事件，实现退出功能
    const layer = layui.layer
    $('#getlogoOut').on('click', function() {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1.清除储存的token
            localStorage.removeItem('token')
                // 2.跳转到登录页面
            location.href = "/login.html"
            layer.close(index);
        });
    })

})

// 获取用户信息的函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token") || " "
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 获取用户信息成功，渲染用户头像
            renderAvatar(res.data)
        },
        // 无论ajax执行失败还是成功，都会调用complete回调函数
        // complete: function(res) {
        //     // complete回调函数中，通过res.responseJSON获得服务器响应的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
        //     // 1.强制清除token
        //         localStorage.removeItem('token')
        //         // 2.强制跳转登录页面
        //     location.href = "/login.html"
        //  }
        // }
    })
}

// 渲染用户头像的函数
function renderAvatar(user) {
    // 1.获取用户名称
    const name = user.nickname || user.username;
    // 设置欢迎文本
    $(".welcome").html('欢迎&nbsp;&nbsp;' + name);
    // 渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text_avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $(".text_avatar").html(first).show()
    }




}