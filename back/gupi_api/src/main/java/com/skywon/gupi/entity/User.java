package com.skywon.gupi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_id;

    private String name;

    private String firstName;

    private Integer age;

    private String address;

    private String email;

    private String password;

    private String profile;

    private String role;

//    @OneToMany(mappedBy = "user")
//    private List<Directory> directory;
}
