package com.deltexplan.gupi.controller;

import com.deltexplan.gupi.entity.Device;
import com.deltexplan.gupi.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @GetMapping("/device")
    public List<Device> getDevices() {
        return  this.deviceService.getAllDevice();
    }
}
