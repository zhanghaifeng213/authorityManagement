package com.imooc.project.service;

import com.imooc.project.entity.Resource;
import com.baomidou.mybatisplus.extension.service.IService;
import com.imooc.project.vo.ResourceVO;
import com.imooc.project.vo.TreeVO;

import java.util.HashSet;
import java.util.List;

/**
 * <p>
 * 资源表 服务类
 * </p>
 *
 * @author zhf
 * @since 2021-01-02
 */
public interface IResourceService extends IMyService<Resource> {
    /**
     * 根据角色id,查询该角色所具有的资源
     * @param roleId
     * @return
     */
    List<ResourceVO> listResourceByRoleId(Long roleId);

    /**
     * 查询系统资源，供前端组件渲染
     * @return
     */
    List<TreeVO> listResource(Long roleId,Integer flag);

    HashSet<String> convert(List<ResourceVO> resourceVOS);
}
