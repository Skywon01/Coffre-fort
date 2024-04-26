package com.skywon.gupi.repository;

import com.skywon.gupi.entity.Sending_document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Sending_documentRepository extends JpaRepository<Sending_document, Integer> {
}
