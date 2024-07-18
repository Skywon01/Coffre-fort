package com.skywon.gupi.repository;

import com.skywon.gupi.entity.DirectoryChild;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DirectoryChildRepository extends JpaRepository<DirectoryChild, Integer> {
    List<DirectoryChild> findByParentId(Integer parentId);
}
