package com.skywon.gupi.service;

import com.skywon.gupi.dto.DirectoryDTO;
import com.skywon.gupi.entity.Directory;
import com.skywon.gupi.repository.DirectoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DirectoryService {
    @Autowired
    private DirectoryRepository directoryRepository;


    public List<DirectoryDTO> getAll() {
        List<Directory> directories = directoryRepository.findAll();
        return directories.stream().map(DirectoryDTO::new).collect(Collectors.toList());
    }

    public Directory getDirectoryById(Integer id) {
        return directoryRepository.findById(id).orElse(null);
    }

    public Directory saveDirectory(Directory directory) {
        return directoryRepository.save(directory);
    }

    /**
     * Méthode pour supprimer un répertoire, vérifie s'il ne contient ni dossier enfant, ni fichier avant la suppression
     * @param id
     * @throws Exception
     */
    public void deleteDirectory(Integer id) throws Exception {
        Directory directory = directoryRepository.findById(id).orElseThrow(() -> new Exception("Répertoire non trouvé"));

        // Vérifie si le répertoire contient des fichiers
        if (!directory.getFiles().isEmpty()) {
            throw new Exception("Le répertoire contient des fichiers et ne peut pas être supprimé.");
        }

        if (!directory.getChildren().isEmpty()) {
            throw new Exception("Le répertoire contient des sous-dossiers et ne peut pas être supprimé.");
        }

        directoryRepository.deleteById(id);
    }
}