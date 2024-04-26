package com.skywon.gupi.controller;

import com.skywon.gupi.entity.Device;
import com.skywon.gupi.service.DeviceService;
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

    @GetMapping("/device/{id}")
    public Device getDevice(@PathVariable Integer id) {
        return this.deviceService.getDeviceById(id);
    }

    @PutMapping("device/{id}")
    public Device updateDevice(@PathVariable Integer id, @RequestBody Device device) throws Exception {
        return this.deviceService.updateDevice(id, device);
    }

    @DeleteMapping("device/{id}")
    public void deleteDevice(@PathVariable Integer id) throws Exception {
        this.deviceService.deleteDevice(id);
    }

}
