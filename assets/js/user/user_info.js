$(function() {
    const layer = layui.layer
    const form = layui.form
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "用户昵称的长度为1-6之间"
            }
        }
    })

    initUserInfo();
    // 初始化表单中的用信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // 调用form.val()快速为表单赋值
                form.val("form-filter-userinfo", res.data)
            }
        })
    }

    // 重置表单的用户信息
    $('#btnReset').on('click', function(e) {
        // 阻止默认的提交行为
        e.preventDefault();
        // 初始化表单中的用信息
        initUserInfo()
    })

    // 监听表单的提交事件
    $(".layui-form").on('submit', function(e) {
        // 阻止默认的提交行为
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(".layui-form").serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                    // 调用父页面的方法渲染用户头像和用户信息
                window.parent.getUserInfo()
            }
        })
    })
})