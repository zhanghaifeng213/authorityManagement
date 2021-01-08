package com.imooc.project.dao;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.imooc.project.entity.Resource;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.imooc.project.vo.ResourceVO;
import com.imooc.project.vo.TreeVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 * 资源表 Mapper 接口
 * </p>
 *
 * @author zhf
 * @since 2021-01-02
 */
public interface ResourceMapper extends BaseMapper<Resource> {
    List<ResourceVO> listResource(@Param(Constants.WRAPPER) QueryWrapper<Resource> wrapper);
    List<TreeVO> listResourceByRoleId(
            @Param(Constants.WRAPPER) QueryWrapper<Resource> wrapper,
            @Param("roleId") Long roleId);
}
