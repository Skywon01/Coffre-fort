package com.deltexplan.gupi.service;

import com.deltexplan.gupi.repository.DirectoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DirectoryService {
    @Autowired
    private DirectoryRepository directoryRepository;
}
