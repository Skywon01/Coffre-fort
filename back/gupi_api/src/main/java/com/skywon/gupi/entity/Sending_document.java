package com.skywon.gupi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="sending_document")
public class Sending_document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer sending_document_id;
}
