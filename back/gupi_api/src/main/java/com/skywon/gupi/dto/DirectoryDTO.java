package com.skywon.gupi.dto;

import com.skywon.gupi.entity.Directory;
import lombok.Data;

@Data
public class DirectoryDTO {
    private Integer id;
    private String name;
    private Integer parent_id;


    public DirectoryDTO(Directory directory) {
        this.id = directory.getId();
        this.name = directory.getName();
        this.parent_id = directory.getParent() != null ? directory.getParent().getId() : null;
    }
}

