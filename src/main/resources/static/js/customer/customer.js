
    var table=layui.table;
    var tableIns=table.render({
        elem:'#demo',
        url:'/customer/list',
        page:true, // 开启分页
        // response:{
        //     statusName:'code', //规定返回的状态码字段为code
        //     statusCode:200 //规定成功的状态码味200
        // },
        parseData:function(res){
            console.log(res.code)
            console.log(res.msg)
            console.log(res.data.count)
            console.log(res.data.records)
            return {
                "code":res.code,
                "msg":res.msg,
                "count":res.data.count,
                "data":res.data.records
            }
        },
        cols: [[
            {field:'realName',title:'真实姓名'},
            {field:'sex',title:'性别'},
            {field:'age',title:'年龄'},
            {field:'phone',title:'手机号码'},
            {field:'createTime',title:'创建时间'},
            {title:'操作',toolbar:'#barDemo'}
        ]]
    })
    // layui.use('table', function(){
    //     var table = layui.table;
    //
    //     //第一个实例
    //     var tableIns=table.render({
    //         elem: '#demo'
    //         ,height: 312
    //         ,url: '/customer/list' //数据接口
    //         ,page: true //开启分页
    //         ,cols: [[ //表头
    //             {field:'realName',title:'真实姓名'}
    //             ,{field:'sex',title:'性别'}
    //             ,{field:'age',title:'年龄'}
    //             ,{field:'phone',title:'手机号码'}
    //             ,{field:'createTime',title:'创建时间'}
    //             ,{title:'操作',toolbar:'#bardemo'}
    //         ]]
    //         ,parseData:function(res){
    //             console.log(res.code)
    //             console.log(res.msg)
    //             console.log(res.data.count)
    //             console.log(res.data.records)
    //             return {
    //                 "code":res.code,
    //                 "msg":res.msg,
    //                 "count":res.data.count,
    //                 "data":res.data.records
    //             }
    //         }
    //     });
    //
    // });

function query(){
    tableIns.reload({
        where:{
            realName:$("#realName").val(),
            phone:$("#phone").val()
        },
        page:{
            curr:1
        }
    })
}

function toAdd() {
    // $.get('/customer/toAdd',function(res){
    //     layer.open({
    //         type:1,
    //         title:'新增客户',
    //         area:['800px','450px'],
    //         content:res
    //     })
    //     layui.form.render();
    // });
    openLayer('/customer/toAdd','新增客户');
    layui.form.render()
    mySubmit('addSubmit','POST')

    // layui.form.on('submit(addSubmit)',function(data){
    //     $.ajax({
    //         url: data.form.action,
    //         async:false,
    //         type:"POST",
    //         contentType:'application/json;charset=utf-8',
    //         data:JSON.stringify(data.field),
    //         success:function(res){
    //             if(res.code==0){
    //                 layer.closeAll();
    //                 query();
    //             }else{
    //                 layer.alert(res.msg);
    //             }
    //         }
    //     })
    //     return false
    // })
}



    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

        let customerId=data.customerId;
        if(layEvent === 'detail'){ //查看
            //do somehing
            openLayer('/customer/toDetail/'+customerId+'','客户详情');
        } else if(layEvent === 'del'){ //删除
            layer.confirm('真的删除行么', function(index){
                myDelete("/customer/"+customerId)
                layer.close(index);
                //向服务端发送删除指令
            });
        } else if(layEvent === 'edit'){ //编辑
            //do something
            openLayer('/customer/toUpdate/'+customerId+'','修改客户');
            layui.form.render()
            mySubmit('updateSubmit','PUT')

        }
    });