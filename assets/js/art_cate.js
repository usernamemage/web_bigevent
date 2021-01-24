$(function () {
    getCateInfo();
    var layer = layui.layer;
    var form = layui.form;
    // 添加分类
    var indexAdd = null;
    $('#addCateBtn').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dia-add').html()
        })
    })
    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                getCateInfo()
                layer.msg('新增分类成功！')
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })

    // 编辑分类
    var indexEdit = null;
    $('body').on('click', '#btnEdit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章分类',
            content: $('#dia-edit').html()
        })

        var id = $(this).data('id');
        $.ajax({
            method: 'GET',
            url: 'my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })

    // 更新修改分类后的数据
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                getCateInfo()
            }
        })
    })

    $('tbody').on('click', '#btnDel', function () {
        var id = $(this).attr('data-id')
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: 'my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    getCateInfo()
                }
            })
        })
    })
})

function getCateInfo() {
    $.ajax({
        method: 'GET',
        url: 'my/article/cates',
        success: function (res) {
            var htmlStr = template('tpl-cate', res);
            $('tbody').html(htmlStr);
        }
    })
}