package com.skywon.gupi.controller;

import com.skywon.gupi.entity.FileUploadInfo;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
public class FileController {

    // On retrouve @Value dans application properties
    @Value("${file.path}")
    private String path;
    @PostMapping("/file/upload")
    public FileUploadInfo upload(@RequestParam MultipartFile file){ // input type="file"
        SimpleDateFormat format = new SimpleDateFormat("/yyyy/MM/");
        File directory = new File(path+format.format(new Date()));
        if (!directory.exists() || !directory.isDirectory()){
            directory.mkdirs();
        }

        try{
            String uniqueID = UUID.randomUUID().toString();

            int positionDernierPoint = file.getOriginalFilename().lastIndexOf(".");
            String fileName  = uniqueID  + file.getOriginalFilename().substring(positionDernierPoint);

            file.transferTo(new File(directory, fileName));
            return new FileUploadInfo(false,null, "/file/image"+format.format(new Date())+fileName);
        }catch (Exception ex){
            ex.printStackTrace();
            return new FileUploadInfo(true, ex.getMessage(), null);
        }

    }

    @GetMapping("/file/image/{annee}/{mois}/{fileName}")
    public ResponseEntity<?> displayImage(@PathVariable String fileName,@PathVariable String annee,@PathVariable String mois){
        File file = new File(path+"/"+annee+"/"+mois+"/"+fileName);
        if (!file.exists()){
            return null;
        }
        try{
            byte[] imageData = Files.readAllBytes(file.toPath());
            return ResponseEntity.ok().contentType(MediaType.valueOf("image/png")).body(imageData);
        }catch (Exception ex){
            ex.printStackTrace();
            return null;
        }


    }

}
