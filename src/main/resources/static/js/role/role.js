var table=layui.table;
var tableIns=table.render({
    elem:'#roleList',
    url:'/role/list',
    page:true, // 开启分页
    parseData:function(res){
        return {
            "code":res.code,
            "msg":res.msg,
            "count":res.data.count,
            "data":res.data.records
        }
    },
    cols: [[
        {field:'roleName',title:'角色名称'},
        // {field:'remarks',title:'角色备注'},
        {field:'createTime',title:'创建时间'},
        {title:'操作',toolbar:'#barDemo'}
    ]]
})

function query(){
    tableIns.reload({
        where:{
            roleName:$("#roleName").val(),
        },
        page:{
            curr:1
        }
    })
}

function toAdd() {
    openLayer('/role/toAdd','新增角色');
    layui.form.render()
    mySubmit('addSubmit','POST',addIds)
}



//监听工具条
table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
    var data = obj.data; //获得当前行数据
    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
    var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

    let roleId=data.roleId;
    if(layEvent === 'detail'){ //查看
        //do somehing
        openLayer('/role/toDetail/'+roleId+'','角色详情');
        showTree('/role/listResource/'+roleId+'/1','resource',false);
    } else if(layEvent === 'del'){ //删除
        layer.confirm('真的删除行么', function(index){
            myDelete("/role/"+roleId)
            layer.close(index);
            //向服务端发送删除指令
        });
    } else if(layEvent === 'edit'){ //编辑
        //do something
        openLayer('/role/toUpdate/'+roleId+'','修改角色');
        showTree('/role/listResource/'+roleId+'/0','resource',true)
        mySubmit('updateSubmit','PUT',addIds)

    }
});

function intoAdd(){

    openLayer('/role/toAdd','新增角色');

    // $.ajax({
    //     url: '/role/listResource',
    //     async:false,
    //     type:"GET",
    //     success:function(res){
    //         if(res.code==0){
    //             layui.tree.render({
    //                 elem: '#resource',
    //                 data: res.data,
    //                 id:'resource',
    //                 showCheckbox:true,
    //                 click: function(obj){
    //                     console.log(obj.data); //得到当前点击的节点数据
    //                     console.log(obj.state); //得到当前节点的展开状态：open、close、normal
    //                     console.log(obj.elem); //得到当前节点元素
    //
    //                     console.log(obj.data.children); //当前节点下是否有子节点
    //                 }
    //             });
    //         }
    //     }
    // })

    showTree('/role/listResource','resource',true)
    mySubmit('addSubmit','POST',addIds)

}

/**
 * 通用的资源树方法
 * @param url
 * @param id
 */
function showTree(url,id,showCheckbox){
    if(typeof (showCheckbox)=='undefind'){
        showCheckbox=true
    }
    $.ajax({
        url: url,
        async:false,
        type:"GET",
        success:function(res){
            if(res.code==0){
                layui.tree.render({
                    elem: '#'+id,
                    data: res.data,
                    id:id,
                    showCheckbox:showCheckbox,
                    click: function(obj){
                        console.log(obj.data); //得到当前点击的节点数据
                        console.log(obj.state); //得到当前节点的展开状态：open、close、normal
                        console.log(obj.elem); //得到当前节点元素

                        console.log(obj.data.children); //当前节点下是否有子节点
                    }
                });
            }
        }
    })
}