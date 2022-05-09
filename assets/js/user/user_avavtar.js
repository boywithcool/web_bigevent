 $(function() {
     const layer = layui.layer

     // 1.1 获取裁剪区域的 DOM 元素
     var $image = $('#image')
         // 1.2 配置选项
     const options = {
         // 纵横比
         aspectRatio: 1,
         // 指定预览区域
         preview: '.img-preview'
     }

     // 1.3 创建裁剪区域
     $image.cropper(options)

     //  监听上传按钮的点击事件
     $('#btnChoosen').on('click', function() {
         $('#file').click()
     })

     //  监听input的change事件
     $('#file').on('change', function(e) {
         // 获取用户选的文件列表
         const fileList = e.target.files
         if (fileList.length === 0) {
             return layer.msg('请选择照片！')
         }
         // 替换裁剪区域的照片
         // 1.拿到用户选择的文件
         const file = e.target.files[0]
             // 2.将文件装换为url
         var imgUrl = URL.createObjectURL(file)
             // 3.初始化裁剪区域
         $image
             .cropper("destroy") /* 销毁旧区域 */
             .attr('src', imgUrl) /* 设置图片的路径 */
             .cropper(options) /*  初始化裁剪区域*/
     })

     //  修改用户头像
     $('#btnYes').on('click', function() {
         // 1.拿到用户的修改后的头像
         var dataURL = $image
             .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                 width: 100,
                 height: 100
             })
             .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
             //  2.将头像上传服务器
         $.ajax({
             method: "POST",
             url: '/my/update/avatar',
             data: {
                 avatar: dataURL
             },
             success: function(res) {
                 if (res.status !== 0) {
                     return layer.msg('上传头像失败！')
                 }
                 layer.msg('上传头像成功！')
                     // 调用父方法，重新获得用户信息
                 window.parent.getUserInfo()
             }
         })
     })
 })