package com.deltexplan.gupi.controller;

import com.deltexplan.gupi.entity.Device;
import com.deltexplan.gupi.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/device")
    public Device addDevice(@RequestBody Device device) {
        return this.deviceService.save(device);
    }
}
