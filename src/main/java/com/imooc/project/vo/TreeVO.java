package com.imooc.project.vo;

import lombok.Data;

import java.util.List;

@Data
public class TreeVO {
    private String title;
    private Long id;
    private List<TreeVO> children;
    private boolean checked;
}
