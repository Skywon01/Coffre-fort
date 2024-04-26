package com.skywon.gupi.service;

import com.skywon.gupi.entity.File;
import com.skywon.gupi.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    public String uploadFile(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        return "Le fichier: " + file.getOriginalFilename() + " a bien été téléchargé.";
    }

    public List<File> getAll() {
        return this.fileRepository.findAll();
    }
}