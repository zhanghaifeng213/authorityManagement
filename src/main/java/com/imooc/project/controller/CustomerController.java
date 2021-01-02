package com.imooc.project.controller;


import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.api.R;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.imooc.project.entity.Customer;
import com.imooc.project.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * <p>
 * 客户表 前端控制器
 * </p>
 *
 * @author zhf
 * @since 2021-01-02
 */
@Controller
@RequestMapping("customer")
public class CustomerController {
    @Autowired
    private ICustomerService customerService;
    /**
     * 进入列表页
     * @return
     */
    @GetMapping("toList")
    public String toList(){
        return "customer/customerList";
    }

    /**
     * 查询方法
     * @param realName
     * @param phone
     * @param page
     * @param limit
     * @return
     */
    @GetMapping("list")
    @ResponseBody
    public R<Map<String,Object>> list(String realName,String phone,Long page,Long limit){
        LambdaQueryWrapper<Customer> wrapper = Wrappers.<Customer>lambdaQuery()
                .like(StringUtils.isNotBlank(realName),Customer::getRealName,realName)
                .like(StringUtils.isNotBlank(phone),Customer::getPhone,phone)
                .orderByDesc(Customer::getCustomerId);
        Page<Customer> myPage = customerService.page(new Page<>(page, limit), wrapper);
        HashMap<String,Object> data=new HashMap<>();
        data.put("count",myPage.getTotal());
        data.put("records",myPage.getRecords());

        return R.ok(data);
    }
}
