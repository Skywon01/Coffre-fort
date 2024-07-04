package com.skywon.gupi.controller;

import com.skywon.gupi.entity.Directory;
import com.skywon.gupi.entity.User;
import com.skywon.gupi.repository.DirectoryRepository;
import com.skywon.gupi.repository.UserRepository;
import com.skywon.gupi.service.DirectoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/folders")
public class DirectoryController {
    private final DirectoryRepository directoryRepository;
    private final UserRepository userRepository;
    @Autowired
    private DirectoryService directoryService;

    public DirectoryController(DirectoryRepository directoryRepository, UserRepository userRepository) {
        this.directoryRepository = directoryRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/{userId}")
    public Directory createDirectoryForUser(@PathVariable Integer userId, @RequestBody Directory directory) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        directory.setUser(user);
        return directoryRepository.save(directory);
    }

    @GetMapping("/user/{userId}")
    public List<Directory> getDirectoryForUser(@PathVariable Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return directoryRepository.findByUser(user);
    }

//    @GetMapping("folder/folderid/{directoryId}")
//    public List<Directory> getDirectoryForFolder(@PathVariable Integer directoryId) {
//        User user = userRepository.findById(directoryId).orElseThrow(() -> new RuntimeException("User not found"));
//        return directoryRepository.findById(userId);
//    }

    @GetMapping("folderall")
    public List<Directory> allDirectory() {
        return this.directoryService.getAll();
    }
}
