package com.imooc.project.service;

import com.imooc.project.entity.Role;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 角色表 服务类
 * </p>
 *
 * @author zhf
 * @since 2021-01-02
 */
public interface IRoleService extends IMyService<Role> {
    /**
     * 新增角色及角色所具有的资源
     * @param role
     * @return
     */
    boolean saveRole(Role role);
    /**
     * 修改角色及角色所具有的资源
     * @param role
     * @return
     */
    boolean updateRole(Role role);
}
