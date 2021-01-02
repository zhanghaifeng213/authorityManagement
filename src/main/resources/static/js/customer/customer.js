var table=layui.table;
table.render({
    elem:'#customerList',
    url:'/customer/list',
    page:true, // 开启分页
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

