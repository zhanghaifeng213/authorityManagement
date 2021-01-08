package com.imooc.project.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

public interface MyMapper<T> extends BaseMapper<T> {
    /**
     * 逻辑删除自带填充功能
     * @param entity
     * @return
     */
    int deleteByIdWithFill(T entity);
}
