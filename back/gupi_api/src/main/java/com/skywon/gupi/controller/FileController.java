package com.skywon.gupi.controller;


import com.skywon.gupi.service.FileService;
import com.skywon.gupi.service.UserNotificationService;
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

    @Autowired
    private UserNotificationService userNotificationService;

    @Value("${file.path}")
    private String relativePath;


    @GetMapping
    public List<com.skywon.gupi.entity.File> allFiles() {
        return this.fileService.getAll();
    }

    @GetMapping("/{id}")
    public com.skywon.gupi.entity.File getFileById(@PathVariable Integer id) {
        return fileService.getFileById(id);
    }


    @PostMapping("/upload")
    public ResponseEntity<ResponseEntity<String>> upload(@RequestParam MultipartFile file, @RequestParam Integer directoryId) throws Exception{
        ResponseEntity<String> responseBody = fileService.uploadFile(file, directoryId);
        return ResponseEntity.ok(responseBody);
    }

    @PostMapping("/upload-to-user-folder/{userId}")
    public ResponseEntity<String> uploadToUserFolder(@RequestParam MultipartFile file, @PathVariable Integer userId, @RequestParam String senderName, @RequestParam String senderFirstName) {
        String response = fileService.uploadFileToUserFolder(file, userId, senderName, senderFirstName);
        System.out.println("Received file: " + file.getOriginalFilename());

        System.out.println("Received userId: " + userId);
        System.out.println("Received senderName: " + senderName);
        System.out.println("Received senderFirstName: " + senderFirstName);
//        userNotificationService.createNotification(senderName, senderFirstName, file.getOriginalFilename(), userId);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/directory/{directoryId}")
    public List<com.skywon.gupi.entity.File> getFilesByDirectoryId(@PathVariable Integer directoryId) {
        return fileService.getFilesByDirectoryId(directoryId);
    }

    @GetMapping("/image/{annee}/{mois}/{fileName}")
    public ResponseEntity<?> displayImage(@PathVariable String fileName, @PathVariable String annee, @PathVariable String mois) {
        Path filePath = Paths.get(relativePath, annee, mois, fileName).toAbsolutePath();
        File file = filePath.toFile();

        if (!file.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Le fichier n'existe pas");
        }
        try {
            byte[] imageData = Files.readAllBytes(filePath);
            return ResponseEntity.ok().contentType(MediaType.valueOf("image/png")).body(imageData);
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la lecture du fichier");
        }
    }


    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Integer id) {
        // Récupération des informations du fichier depuis le service
        com.skywon.gupi.entity.File fileEntity = fileService.getFileById(id);
        if (fileEntity == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        try {
            // Création de l'objet Path à partir du chemin enregistré
            Path path = Paths.get(fileEntity.getFile_path());
            Resource resource = new UrlResource(path.toUri());

            if (!resource.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Récupération du type de contenu depuis la base de données ou le déterminer si absent
            String contentType = fileEntity.getFile_content_type();
            if (contentType == null || contentType.isEmpty()) {
                contentType = Files.probeContentType(path);
            }

            // Création des en-têtes pour le téléchargement du fichier
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(contentType));
            headers.setContentDisposition(ContentDisposition.builder("attachment")
                    .filename(fileEntity.getOriginal_file_name()).build());

            // Retourner le fichier en tant que ressource
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/image/{annee}/{mois}/{fileName}")
    public ResponseEntity<?> deleteImage(@PathVariable String fileName, @PathVariable String annee, @PathVariable String mois) {
        try {
            Path filePath = Paths.get(relativePath, annee, mois, fileName).toAbsolutePath();
            File file = filePath.toFile();
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

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteFile(@PathVariable Integer id) {
        try {
            fileService.deleteFile(id);
            return ResponseEntity.noContent().build(); // Réponse 204
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Réponse 500
        }
    }
}