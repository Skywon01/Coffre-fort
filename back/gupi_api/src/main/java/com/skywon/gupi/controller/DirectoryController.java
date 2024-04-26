package com.skywon.gupi.controller;

import com.skywon.gupi.service.DirectoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class DirectoryController {
    @Autowired
    private DirectoryService directoryService;
}
