package com.imooc.project.util;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.Data;

@Data
public class MyQuery<T> {
    private Page<T> page;
    private QueryWrapper<T> wrapper;
}
