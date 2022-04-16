$(function() {
    // 点击切换到注册界面
    $("#link-reg").on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 点击切换到登录界面
    $("#link-login").on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 给登录和注册的界面添加验证规则
    // 从layui中获取的form对象
    const form = layui.form
        // 从layui中获取的layer对象
    const layer = layui.layer
        // 通过form.verify()函数设置自定义验证规则
    form.verify({
        // password 的验证规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        // 确认两次密码是否一致
        repwd: function(value) {
            // 通过形参value得到repassword
            //再通过jQuery获得password
            const pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#reg-form').on('submit', (e) => {
        // 阻止默认的提交行为
        e.preventDefault()
            // 发起ajax请求
        const data = {
            username: $('#reg-form [name=username]').val(),
            password: $('#reg-form [name=password]').val(),
        };
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: data,
            success: function(res) {
                // sttatus 不为0
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录')
                    // 注册成功后自动跳转登录界面,即模拟点击去登录按钮
                $('#link-login').click()
            }
        })
    })

    // 监听登录表单的提交事件
    $('#login-form').on('submit', (e) => {
        // 阻止默认的提交行为
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单数据
            data: $('#login-form').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layer.msg(res + '登录失败');
                }
                // console.log($('#login-form').serialize());
                layer.msg('登录成功')
                console.log(res.token);
                // 将登录成功后得到的token字符串保存到localStorage中
                localStorage.setItem('token', res.token)
                    // 跳转到index.html
                location.href = '/index.html'
            }
        })
    })
})