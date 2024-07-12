package com.skywon.gupi.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class CreateDirectoryRequest {
    private String name;
    private Integer user_id;
}
