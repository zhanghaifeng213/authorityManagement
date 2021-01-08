package com.imooc.project.service.impl;

import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.imooc.project.dao.RoleResourceMapper;
import com.imooc.project.entity.Resource;
import com.imooc.project.entity.Role;
import com.imooc.project.dao.RoleMapper;
import com.imooc.project.entity.RoleResource;
import com.imooc.project.service.IRoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * <p>
 * 角色表 服务实现类
 * </p>
 *
 * @author zhf
 * @since 2021-01-02
 */
@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements IRoleService {

    @Autowired
    private RoleResourceMapper roleResourceMapper;
    /**
     * 新增角色及角色所具有的资源
     * @param role
     * @return
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean saveRole(Role role) {
        save(role);
        Long roleId=role.getRoleId();
        List<Long> resourceIds=role.getResourceIds();
        if(CollectionUtils.isNotEmpty(resourceIds)){
            for(Long resourceId:resourceIds){
                RoleResource roleResource = new RoleResource();
                roleResource.setRoleId(roleId);
                roleResource.setResourceId(resourceId);
                roleResourceMapper.insert(roleResource);
            }

        }
        return true;
    }

    @Override
    public boolean updateRole(Role role) {
        updateById(role);
        Long roleId=role.getRoleId();

        roleResourceMapper.delete(Wrappers.<RoleResource>lambdaQuery().eq(RoleResource::getRoleId,roleId));

        List<Long> resourceIds=role.getResourceIds();
        if(CollectionUtils.isNotEmpty(resourceIds)){
            for(Long resourceId:resourceIds){
                RoleResource roleResource = new RoleResource();
                roleResource.setRoleId(roleId);
                roleResource.setResourceId(resourceId);
                roleResourceMapper.insert(roleResource);
            }

        }
        return true;
    }
}
