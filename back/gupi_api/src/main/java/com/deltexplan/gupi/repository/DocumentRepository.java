package com.deltexplan.gupi.repository;

import com.deltexplan.gupi.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepository extends JpaRepository <Document, Integer> {
}
