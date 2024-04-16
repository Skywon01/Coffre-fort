package com.deltexplan.gupi.repository;

import com.deltexplan.gupi.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceRepository extends JpaRepository <Device, Integer> {
}
