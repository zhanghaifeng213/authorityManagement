
    // var table=layui.table;
    // table.render({
    //     elem:'#customerlist',
    //     url:'/customer/list',
    //     page:true, // 开启分页
    //     // response:{
    //     //     statusName:'code', //规定返回的状态码字段为code
    //     //     statusCode:200 //规定成功的状态码味200
    //     // },
    //     parseData:function(res){
    //         console.log(res.code)
    //         console.log(res.msg)
    //         console.log(res.data.count)
    //         console.log(res.data.records)
    //         return {
    //             "code":res.code,
    //             "msg":res.msg,
    //             "count":res.data.count,
    //             "data":res.data.records
    //         }
    //     },
    //     cols: [[
    //         {field:'realName',title:'真实姓名'},
    //         {field:'sex',title:'性别'},
    //         {field:'age',title:'年龄'},
    //         {field:'phone',title:'手机号码'},
    //         {field:'createTime',title:'创建时间'},
    //         {title:'操作',toolbar:'#barDemo'}
    //     ]]
    // })
    layui.use('table', function(){
        var table = layui.table;

        //第一个实例
        table.render({
            elem: '#demo'
            ,height: 312
            ,url: '/customer/list' //数据接口
            ,page: true //开启分页
            ,cols: [[ //表头
                {field:'realName',title:'真实姓名'}
                ,{field:'sex',title:'性别'}
                ,{field:'age',title:'年龄'}
                ,{field:'phone',title:'手机号码'}
                ,{field:'createTime',title:'创建时间'}
                ,{title:'操作',toolbar:'#bardemo'}
            ]]
            ,parseData:function(res){
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
            }
        });

    });
