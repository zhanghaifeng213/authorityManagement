layui.laydate.render({
    elem:"#createTimeRange",
    range:true,

});
    var table=layui.table;
    var tableIns=table.render({
        elem:'#accountList',
        url:'/account/list',
        page:true, // 开启分页
        // response:{
        //     statusName:'code', //规定返回的状态码字段为code
        //     statusCode:200 //规定成功的状态码味200
        // },
        parseData:function(res){
            return {
                "code":res.code,
                "msg":res.msg,
                "count":res.data.count,
                "data":res.data.records
            }
        },
        cols: [[
            {field:'username',title:'用户名'},
            {field:'realName',title:'真实姓名'},
            {field:'roleName',title:'角色名称'},
            {field:'sex',title:'性别'},
            {field:'email',title:'邮箱'},
            {field:'createTime',title:'创建时间'},
            {title:'操作',toolbar:'#barDemo'}
        ]]
    })


function query(){
    tableIns.reload({
        where:{
            realName:$("#realName").val(),
            email:$("#email").val(),
            createTimeRange:$("#createTimeRange").val()
        },
        page:{
            curr:1
        }
    })
}

function toAdd() {

    openLayer('/account/toAdd','新增客户');
    layui.form.render()
    mySubmit('addSubmit','POST')


}



    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

        let accountId=data.accountId;
        if(layEvent === 'detail'){ //查看
            //do somehing
            openLayer('/account/toDetail/'+accountId+'','客户详情');
        } else if(layEvent === 'del'){ //删除
            layer.confirm('真的删除行么', function(index){
                layer.close(index);
                myDelete("/account/"+accountId)

                //向服务端发送删除指令
            });
        } else if(layEvent === 'edit'){ //编辑
            //do something
            openLayer('/account/toUpdate/'+accountId+'','修改客户');
            layui.form.render()
            mySubmit('updateSubmit','PUT')

        }
    });

layui.form.verify({
    checkUsername: function(value, item){ //value：表单的值、item：表单的DOM对象
        let error=null;
        let url='/account/'+value
        let accountId=$("input[name='accountId']").val()
        if(typeof (accountId)!='undefined'){
            url=url+'/'+accountId
        }
        $.ajax({
            url:url,
            async:false,
            type:'GET',
            success:function(res){
                if(res.code==0){
                    if(res.data>0){
                        error="用户名已经存在"
                    }
                }else{
                    error="用户检测出错"
                }
            },
            error:function(){
                error="用户检测出错"
            }
        })
        if(error!=null){
            return error
        }
    }


});