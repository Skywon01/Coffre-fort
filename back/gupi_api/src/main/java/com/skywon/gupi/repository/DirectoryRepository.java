package com.skywon.gupi.repository;

import com.skywon.gupi.entity.Directory;
import com.skywon.gupi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DirectoryRepository extends JpaRepository<Directory, Integer> {

    List<Directory> findByUser(User user);
    List<Directory> findByParent(Directory parent);
    List<Directory> findByUserAndParentIsNull(User user);

    Optional<Directory> findByUserAndName(User user, String documentsEnvoyés);
}
