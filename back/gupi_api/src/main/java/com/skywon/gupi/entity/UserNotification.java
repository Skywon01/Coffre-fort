package com.skywon.gupi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name="user_notification")
public class UserNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String senderName;
    private String senderFirstName;
    private String fileName;
    private LocalDateTime timestamp;
    private boolean active;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
