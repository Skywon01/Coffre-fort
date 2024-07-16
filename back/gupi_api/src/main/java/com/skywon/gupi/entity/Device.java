package com.skywon.gupi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="device")
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String qr_code;

    private String name;

    private Integer price;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
