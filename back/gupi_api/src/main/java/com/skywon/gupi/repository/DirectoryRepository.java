package com.skywon.gupi.repository;

import com.skywon.gupi.entity.Directory;
import com.skywon.gupi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DirectoryRepository extends JpaRepository<Directory, Integer> {

//    List<Directory> findByUser(User user);
}
