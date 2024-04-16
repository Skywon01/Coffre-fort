package com.deltexplan.gupi.repository;

import com.deltexplan.gupi.entity.sending_type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Sending_typeRepository extends JpaRepository<sending_type, Integer> {
}
