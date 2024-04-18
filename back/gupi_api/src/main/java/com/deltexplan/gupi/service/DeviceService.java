package com.deltexplan.gupi.service;

import com.deltexplan.gupi.entity.Device;
import com.deltexplan.gupi.entity.User;
import com.deltexplan.gupi.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    public List<Device> getAllDevice(){
        return  this.deviceRepository.findAll();
    }
    public Device getDeviceById(int id){
        return this.deviceRepository.findById(id).orElse(new Device());
    }

    public Device save(Device device){
        return this.deviceRepository.save(device);
    }
}
