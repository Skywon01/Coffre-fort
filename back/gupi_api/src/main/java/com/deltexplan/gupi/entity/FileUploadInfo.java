package com.deltexplan.gupi.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FileUploadInfo {
    private boolean erreur;
    private String message;
    private String pathFile;
}
