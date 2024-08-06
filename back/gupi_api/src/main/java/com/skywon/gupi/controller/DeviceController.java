package com.skywon.gupi.controller;

import com.skywon.gupi.entity.Device;
import com.skywon.gupi.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/device")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @GetMapping("")
    public List<Device> getDevices() {
        return  this.deviceService.getAllDevice();
    }

    @PostMapping("")
    public Device addDevice(@RequestBody Device device) {
        return this.deviceService.save(device);
    }

    @GetMapping("/{id}")
    public Device getDevice(@PathVariable Integer id) {
        return this.deviceService.getDeviceById(id);
    }

    @PutMapping("/{id}")
    public Device updateDevice(@PathVariable Integer id, @RequestBody Device device) throws Exception {
        return this.deviceService.updateDevice(id, device);
    }

    @DeleteMapping("/{id}")
    public void deleteDevice(@PathVariable Integer id) throws Exception {
        this.deviceService.deleteDevice(id);
    }

    @GetMapping("/user/{userId}")
    public List<Device> getDevicesByUserId(@PathVariable Integer userId) {
        return this.deviceService.getDevicesByUserId(userId);
    }

    @PutMapping("/unset/{id}")
    public Device unsetDevice(@PathVariable Integer id) throws Exception {
        this.deviceService.getDeviceById(id);
        return  this.deviceService.unsetDevice(id);
    }

}
