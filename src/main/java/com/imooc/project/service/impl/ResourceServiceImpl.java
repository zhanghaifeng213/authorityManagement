package com.imooc.project.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.imooc.project.entity.Resource;
import com.imooc.project.dao.ResourceMapper;
import com.imooc.project.service.IResourceService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.imooc.project.vo.ResourceVO;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * 资源表 服务实现类
 * </p>
 *
 * @author zhf
 * @since 2021-01-02
 */
@Service
public class ResourceServiceImpl extends ServiceImpl<ResourceMapper, Resource> implements IResourceService {

    @Override
    public List<ResourceVO> listResourceByRoleId(Long roleId) {
        QueryWrapper<Resource> query = Wrappers.<Resource>query();
        query.eq("rr.role_id",roleId).isNull("re.parent_id");
        List<ResourceVO> resourceVOS=baseMapper.listResource(query);
        resourceVOS.forEach(r->{
            Long resourceId=r.getResourceId();
            QueryWrapper<Resource> subWrapper=Wrappers.<Resource>query();
            subWrapper.eq("rr.role_id",roleId).eq("re.parent_id",resourceId);
            List<ResourceVO> subResourceVOS=baseMapper.listResource(subWrapper);
            if(CollectionUtils.isNotEmpty(subResourceVOS)){
                r.setSubs(subResourceVOS);
            }
        });
        return resourceVOS;
    }
}
