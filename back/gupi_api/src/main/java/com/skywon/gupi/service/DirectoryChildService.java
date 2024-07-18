package com.skywon.gupi.service;

import com.skywon.gupi.entity.DirectoryChild;
import com.skywon.gupi.repository.DirectoryChildRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DirectoryChildService {
    @Autowired
    private DirectoryChildRepository directoryChildRepository;

    public List<DirectoryChild> getAllDirectoryChildren() {
        return directoryChildRepository.findAll();
    }

    public DirectoryChild getDirectoryChildById(Integer id) {
        return directoryChildRepository.findById(id).orElse(null);
    }

    public List<DirectoryChild> getChildrenByParentId(Integer parentId) {
        return directoryChildRepository.findByParentId(parentId);
    }

    public DirectoryChild saveDirectoryChild(DirectoryChild directoryChild) {
        return directoryChildRepository.save(directoryChild);
    }

    public void deleteDirectoryChild(Integer id) {
        directoryChildRepository.deleteById(id);
    }

}
