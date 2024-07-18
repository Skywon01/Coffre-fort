package com.skywon.gupi.controller;

import com.skywon.gupi.dto.CreateDirectoryRequest;
import com.skywon.gupi.dto.DirectoryDTO;
import com.skywon.gupi.entity.Directory;
import com.skywon.gupi.entity.User;
import com.skywon.gupi.repository.DirectoryRepository;
import com.skywon.gupi.repository.UserRepository;
import com.skywon.gupi.service.DirectoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/directories")
public class DirectoryController {

    @Autowired
    private DirectoryRepository directoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DirectoryService directoryService;

    @GetMapping
    public List<DirectoryDTO> getAllDirectories() {
        return directoryService.getAll();
    }


    @GetMapping("/{id}")
    public Directory getDirectoryById(@PathVariable Integer id) {
        return directoryService.getDirectoryById(id);
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<Directory> createDirectory(@RequestBody CreateDirectoryRequest request) {
        User user = userRepository.findById(request.getUser_id()).orElseThrow(() -> new RuntimeException("User not found"));

        Directory directory = new Directory();
        directory.setName(request.getName());
        directory.setUser(user);

        Directory savedDirectory = directoryRepository.save(directory);
        return ResponseEntity.ok(savedDirectory);
    }


    @PostMapping("/{parent_id}/children")
    public ResponseEntity<Directory> createChildDirectory(@PathVariable Integer parent_id, @RequestBody Directory directory) {
        Directory parentDirectory = directoryRepository.findById(parent_id)
                .orElseThrow(() -> new ResourceNotFoundException("Parent directory not found"));
        directory.setParent(parentDirectory);
        Directory savedDirectory = directoryRepository.save(directory);
        return ResponseEntity.ok(savedDirectory);
    }

    @DeleteMapping("/{id}")
    public void deleteDirectory(@PathVariable Integer id) {
        directoryService.deleteDirectory(id);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Directory>> getUserDirectories(@PathVariable Integer id) {
        User userId = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        List<Directory> directories = directoryRepository.findByUser(userId);
        return ResponseEntity.ok(directories);
    }
}
