package com.skywon.gupi.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageDTO {
    private Integer id;
    private String content;
    private Integer senderId;
    private Integer recipientId;
    private LocalDateTime timestamp;

}
