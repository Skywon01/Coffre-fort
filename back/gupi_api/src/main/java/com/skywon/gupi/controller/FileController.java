package com.skywon.gupi.controller;


import com.skywon.gupi.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("api/file")
public class FileController {

    @Autowired
    private FileService fileService;

    @Value("${file.path}")
    private String path;


    @GetMapping
    public List<com.skywon.gupi.entity.File> allFiles() {
        return this.fileService.getAll();
    }

    @GetMapping("/{id}")
    public com.skywon.gupi.entity.File getFileById(@PathVariable Integer id) {
        return fileService.getFileById(id);
    }


    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam MultipartFile file, @RequestParam Integer directoryId) {
        String response = fileService.uploadFile(file, directoryId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/upload-to-user-folder/{userId}")
    public ResponseEntity<String> uploadToUserFolder(@RequestParam MultipartFile file, @PathVariable Integer userId) {
        String response = fileService.uploadFileToUserFolder(file, userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/directory/{directoryId}")
    public List<com.skywon.gupi.entity.File> getFilesByDirectoryId(@PathVariable Integer directoryId) {
        return fileService.getFilesByDirectoryId(directoryId);
    }

    @GetMapping("/image/{annee}/{mois}/{fileName}")
    public ResponseEntity<?> displayImage(@PathVariable String fileName, @PathVariable String annee, @PathVariable String mois) {
        File file = new File(path + "/" + annee + "/" + mois + "/" + fileName);
        if (!file.exists()) {
            return null;
        }
        try {
            byte[] imageData = Files.readAllBytes(file.toPath());
            return ResponseEntity.ok().contentType(MediaType.valueOf("image/png")).body(imageData);
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

    @DeleteMapping("/image/{annee}/{mois}/{fileName}")
    public ResponseEntity<?> deleteImage(@PathVariable String fileName, @PathVariable String annee, @PathVariable String mois) {
        try {
            File file = new File(path + "/" + annee + "/" + mois + "/" + fileName);
            if (file.exists()) {
                if (file.delete()) {
                    return ResponseEntity.ok().body("Le fichier: " + fileName + " a bien été supprimé");
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Impossible de supprimer ce fichier");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Le fichier n'existe pas");
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Un problème est survenu pendant la suppression");
        }
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Integer id) {
        com.skywon.gupi.entity.File file = fileService.getFileById(id);
        if (file == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        try {
            Path path = Paths.get(file.getFile_path());
            Resource resource = new UrlResource(path.toUri());

            if (!resource.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Set content type based on file extension if not provided
            String contentType = file.getFile_content_type();
            if (contentType == null || contentType.isEmpty()) {
                contentType = Files.probeContentType(path);
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(contentType));
            headers.setContentDisposition(ContentDisposition.builder("attachment").filename(file.getOriginal_file_name()).build());

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}