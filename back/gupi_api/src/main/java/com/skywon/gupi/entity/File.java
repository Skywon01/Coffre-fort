package com.skywon.gupi.entity;

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
    private long file_id;

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
    private Directory directory;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
