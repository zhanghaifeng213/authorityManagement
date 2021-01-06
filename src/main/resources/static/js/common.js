/**
 * 公共弹出层
 * @param url
 * @param title
 */
function openLayer(url,title){
    $.ajaxSettings.async=false;
    $.get(url,function(res){
        layer.open({
            type:1,
            title:title,
            area:['800px','450px'],
            content:res
        })
        // layui.form.render();
    });
    $.ajaxSettings.async=true;
}

/**
 * 监听提交事件
 * @param filter
 * @param type
 */
function mySubmit(filter,type){
    layui.form.on('submit('+filter+')',function(data){
        $.ajax({
            url: data.form.action,
            async:false,
            type:type,
            contentType:'application/json;charset=utf-8',
            data:JSON.stringify(data.field),
            success:function(res){
                if(res.code==0){
                    layer.closeAll();
                    query();
                }else{
                    layer.alert(res.msg);
                }
            }
        })
        return false
    })
}

/**
 * 公共删除方法
 * @param url
 */
function myDelete(url){
    $.ajax({
        url: url,
        async:false,
        type:"DELETE",
        success:function(res){
            if(res.code==0){
                // layer.closeAll();
                query();
            }else{
                layer.alert(res.msg);
            }
        }
    })
}