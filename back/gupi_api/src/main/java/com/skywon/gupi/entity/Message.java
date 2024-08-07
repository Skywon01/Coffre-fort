package com.skywon.gupi.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Entity
@Getter
@Setter
@Table(name = "Message")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Integer id;

    private String content;

    @ManyToOne
    @JoinColumn(name = "senderId")
    private User senderId;

    @ManyToOne
    @JoinColumn(name = "recipientId")
    private User recipientId;

    private LocalDateTime timestamp;
}
