package com.skywon.gupi.controller;

import com.skywon.gupi.entity.Directory;
import com.skywon.gupi.entity.DirectoryChild;
import com.skywon.gupi.service.DirectoryChildService;
import com.skywon.gupi.service.DirectoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/directorieschild")
public class DirectoryChildController {
    @Autowired
    private DirectoryChildService directoryChildService;

    @Autowired
    private DirectoryService directoryService;

    @GetMapping
    public List<DirectoryChild> getAllDirectoryChildren() {
        return directoryChildService.getAllDirectoryChildren();
    }

    @GetMapping("/{id}")
    public DirectoryChild getDirectoryChildById(@PathVariable Integer id) {
        return directoryChildService.getDirectoryChildById(id);
    }

    @GetMapping("/parent/{parentId}")
    public List<DirectoryChild> getChildrenByParentId(@PathVariable Integer parentId) {
        return directoryChildService.getChildrenByParentId(parentId);
    }

    @PostMapping
    public DirectoryChild createDirectoryChild(@RequestBody DirectoryChild directoryChild) {
        Directory parent = directoryService.getDirectoryById(directoryChild.getParent().getId());
        directoryChild.setParent(parent);
        return directoryChildService.saveDirectoryChild(directoryChild);
    }

    @DeleteMapping("/{id}")
    public void deleteDirectoryChild(@PathVariable Integer id) {
        directoryChildService.deleteDirectoryChild(id);
    }
}
