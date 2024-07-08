package com.skywon.gupi.service;

import com.skywon.gupi.entity.Directory;
import com.skywon.gupi.entity.User;
import com.skywon.gupi.repository.DirectoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DirectoryService {
    @Autowired
    private DirectoryRepository directoryRepository;

    public List<Directory> getAll() {
        return this.directoryRepository.findAll();
    }

    public Directory getDirectoryById(Integer id) {
        return directoryRepository.findById(id).orElse(null);
    }

    public Directory saveDirectory(Directory directory) {
        return directoryRepository.save(directory);
    }

    public void deleteDirectory(Integer id) {
        directoryRepository.deleteById(id);
    }
}
