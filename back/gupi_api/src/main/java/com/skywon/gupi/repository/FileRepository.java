package com.skywon.gupi.repository;

import com.skywon.gupi.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<File, Integer> {
    List<File> findByDirectory_Id(Integer directoryId);
    Optional<File> findById(Integer id);

}
