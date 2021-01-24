$(function () {
    // 定义查询参数q
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    initTab();

    function initTab() {
        $.ajax({
            method: 'GET',
            url: 'my/article/list',
            data: q,
            success: function (res) {
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }
        })
    }
})