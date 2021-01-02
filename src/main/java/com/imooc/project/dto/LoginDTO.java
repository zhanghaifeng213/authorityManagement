package com.imooc.project.dto;

import com.imooc.project.entity.Account;
import lombok.Data;

@Data
public class LoginDTO {
    /**
     * 重定向或跳转的路径
     */
    private String path;
    /**
     * 错误提示信息
     */
    private String error;
    /**
     * 当前登录人的信息
     */
    private Account account;
}
