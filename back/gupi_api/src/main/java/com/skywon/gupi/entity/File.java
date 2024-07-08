package com.skywon.gupi.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "File")
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer file_id;
//java nio 2 pour les fichiers
    private String file_name;
    private String file_type;
    private String file_size;
    private String file_path;
    private String file_extension;
    private String file_content;
    private String file_content_type;
    private String file_url;
    private String file_date;

    @ManyToOne
    @JoinColumn(name = "directory_id")
    @JsonBackReference("directory-file")
    private Directory directory;


}
