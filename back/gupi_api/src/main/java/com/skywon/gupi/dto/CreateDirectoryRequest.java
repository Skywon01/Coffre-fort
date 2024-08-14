package com.skywon.gupi.dto;

import lombok.Data;


@Data
public class CreateDirectoryRequest {
    private String name;
    private Integer user_id;
}
