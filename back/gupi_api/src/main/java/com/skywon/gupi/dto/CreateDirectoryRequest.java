package com.skywon.gupi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateDirectoryRequest {
    private String name;
    private Integer user_id;
}
