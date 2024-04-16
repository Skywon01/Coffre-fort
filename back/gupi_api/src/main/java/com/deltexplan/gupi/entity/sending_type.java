package com.deltexplan.gupi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="sending_type")
public class sending_type {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer sending_type_id;

    private String wording;
}
