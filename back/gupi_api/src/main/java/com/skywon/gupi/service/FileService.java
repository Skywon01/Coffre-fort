package com.skywon.gupi.service;

import com.skywon.gupi.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

   public String uploadFile(MultipartFile file) {
       String fileName = file.getOriginalFilename();
        return "Le fichier: " + file.getOriginalFilename() + " a bien été téléchargé.";
   }
}
