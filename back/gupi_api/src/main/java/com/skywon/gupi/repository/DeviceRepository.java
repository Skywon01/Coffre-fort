package com.skywon.gupi.repository;

import com.skywon.gupi.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceRepository extends JpaRepository <Device, Integer> {
}
