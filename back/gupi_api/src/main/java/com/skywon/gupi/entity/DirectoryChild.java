package com.skywon.gupi.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "directorychild")
public class DirectoryChild {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;

    @ManyToOne
    @JoinColumn(name = "directory_id")
    @JsonBackReference("parent-child")
    private Directory parent;

    @OneToMany(mappedBy = "directoryChild", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("directory-child-file")
    private List<File> files;

}