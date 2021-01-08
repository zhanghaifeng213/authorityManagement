package com.imooc.project.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.imooc.project.dto.LoginDTO;
import com.imooc.project.entity.Account;
import com.baomidou.mybatisplus.extension.service.IService;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
 * 账号表 服务类
 * </p>
 *
 * @author zhf
 * @since 2021-01-02
 */
public interface IAccountService extends IMyService<Account> {
    LoginDTO login(String username, String password);
    IPage<Account> accountPage(Page<Account> page, Wrapper<Account> wrapper);
    Account getAccountById(Long id);
}
