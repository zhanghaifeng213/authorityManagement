package com.imooc.project.vo;

import lombok.Data;

import java.util.List;

@Data
public class ResourceVO {
    private Long resourceId;
    private Long parentId;

    /**
     * 资源名称
     */
    private String resourceName;

    /**
     * 资源类型(0、目录 1、菜单 2、按钮)
     */
    private Integer resourceType;

    /**
     * url
     */
    private String url;

    /**
     * code
     */
    private String code;

    /**
     * 排序
     */
    private Integer sort;

    private List<ResourceVO> subs;
}
