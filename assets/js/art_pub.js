$(function () {
    var layer = layui.layer;
    var form = layui.form;
    initCate();
    // 初始化富文本编辑器
    initEditor()
    function initCate() {
        $.ajax({
            method: 'GET',
            url: 'my/article/cates',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('文章类别加载失败')
                }
                var htmlStr = template('tpl-cate', res);
                $('[name="cate_id"]').html(htmlStr);
                form.render();
            }
        })
    }

    // 图片裁剪
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#coverBtn').on('click', function () {
        $('#file').click();
    })

    $('#file').on('change', function (e) {
        var files = e.target.files;
        if (files.length == 0) return;
        var imageURL = URL.createObjectURL(files[0]);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imageURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 将表单数据以formData的格式存入
    var state = '已发布';
    $('#btnSave').on('click', function () {
        state = '草稿';
    })

    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        // 需要接收一个dom对象作为参数
        var fd = new FormData($(this)[0]);
        fd.append('state', state);
        // 将封面裁剪过后的图片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                pubArticle(fd);
            })
    })

    function pubArticle(fd) {
        $.ajax({
            method: "POST",
            url: 'my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                // 发布文章成功后，跳转到文章列表页面
                location.href = 'art_list.html'
            }
        })
    }
})