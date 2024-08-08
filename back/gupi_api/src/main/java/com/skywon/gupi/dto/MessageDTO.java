package com.skywon.gupi.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageDTO {
    private Integer id;
    private String content;
    private UserDto senderId; // Utiliser un objet UserDTO
    private UserDto recipientId; // Utiliser un objet UserDTO
    private LocalDateTime timestamp;

}
