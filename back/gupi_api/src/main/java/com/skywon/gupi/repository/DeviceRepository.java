package com.skywon.gupi.repository;

import com.skywon.gupi.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository <Device, Integer> {
    List<Device> findByUserId(Integer userId);
}
