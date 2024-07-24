package com.skywon.gupi.service;

import com.skywon.gupi.entity.Directory;
import com.skywon.gupi.entity.User;
import com.skywon.gupi.repository.DirectoryRepository;
import com.skywon.gupi.repository.FileRepository;
import com.skywon.gupi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private DirectoryRepository directoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${file.path}")
    private String path;

    public String uploadFile(MultipartFile file, Integer directoryId)  {
        Directory directory = directoryRepository.findById(directoryId).orElseThrow(() -> new RuntimeException("Directory not found"));

        String uniqueID = UUID.randomUUID().toString();
        int positionDernierPoint = file.getOriginalFilename().lastIndexOf(".");
        String fileName = uniqueID + file.getOriginalFilename().substring(positionDernierPoint);

        SimpleDateFormat sdf = new SimpleDateFormat("/yyyy/MM/dd/");
        File directoryPath = new File(path + sdf);
        if (!directoryPath.exists() || !directoryPath.isDirectory()) {
            directoryPath.mkdirs();
        }

        try {
            file.transferTo(new File(directoryPath, fileName));

            com.skywon.gupi.entity.File uploadedFile = new com.skywon.gupi.entity.File();
            uploadedFile.setFile_name(fileName);
            uploadedFile.setOriginal_file_name(file.getOriginalFilename());
            uploadedFile.setFile_content(uploadedFile.getFile_content());
            uploadedFile.setFile_content_type(file.getContentType());
            uploadedFile.setFile_extension(file.getOriginalFilename().substring(positionDernierPoint));
            uploadedFile.setFile_path(directoryPath.getPath() + "/" + fileName);
            uploadedFile.setDirectory(directory);
            fileRepository.save(uploadedFile);

            return "Le fichier: " + file.getOriginalFilename() + " a bien été téléchargé.";
        } catch (Exception ex) {
            ex.printStackTrace();
            return "Erreur lors du téléchargement du fichier.";
        }
    }

    public String uploadFileToUserFolder(MultipartFile file, Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Optional<Directory> optionalDirectory = directoryRepository.findByUserAndName(user, "Documents envoyés");

        Directory directory;
        if (optionalDirectory.isPresent()) {
            directory = optionalDirectory.get();
        } else {
            directory = new Directory();
            directory.setName("Documents envoyés");
            directory.setUser(user);
            directory = directoryRepository.save(directory);
        }

        String uniqueID = UUID.randomUUID().toString();
        int positionDernierPoint = file.getOriginalFilename().lastIndexOf(".");
        String fileName = uniqueID + file.getOriginalFilename().substring(positionDernierPoint);

        SimpleDateFormat sdf = new SimpleDateFormat("/yyyy/MM/dd/");
        File directoryPath = new File(path + sdf.format(new Date()));
        if (!directoryPath.exists() || !directoryPath.isDirectory()) {
            directoryPath.mkdirs();
        }

        try {
            file.transferTo(new File(directoryPath, fileName));

            com.skywon.gupi.entity.File uploadedFile = new com.skywon.gupi.entity.File();
            uploadedFile.setFile_name(fileName);
            uploadedFile.setOriginal_file_name(file.getOriginalFilename());
            uploadedFile.setFile_content(uploadedFile.getFile_content());
            uploadedFile.setFile_content_type(file.getContentType());
            uploadedFile.setFile_extension(file.getOriginalFilename().substring(positionDernierPoint));
            uploadedFile.setFile_path(directoryPath.getPath() + "/" + fileName);
            uploadedFile.setDirectory(directory);
            fileRepository.save(uploadedFile);

            // Envoi de notification (à implémenter)
            // notificationService.sendNotification(user.getEmail(), "Nouveau fichier reçu", "Vous avez reçu un nouveau fichier...");

            return "Le fichier: " + file.getOriginalFilename() + " a bien été téléchargé.";
        } catch (Exception ex) {
            ex.printStackTrace();
            return "Erreur lors du téléchargement du fichier.";
        }
    }

    public List<com.skywon.gupi.entity.File> getAll() {
        return this.fileRepository.findAll();
    }

    public com.skywon.gupi.entity.File getFileById(Integer id) {
        return fileRepository.findById(id).orElse(null);
    }

    public void deleteFile(Integer id) {
        fileRepository.deleteById(id);
    }

    public List<com.skywon.gupi.entity.File> getFilesByDirectoryId(Integer directory_id) {
        return fileRepository.findByDirectory_Id(directory_id);
    }
}