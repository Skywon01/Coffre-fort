package com.deltexplan.gupi.controller;

import com.deltexplan.gupi.service.DirectoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class DirectoryController {
    @Autowired
    private DirectoryService directoryService;
}
