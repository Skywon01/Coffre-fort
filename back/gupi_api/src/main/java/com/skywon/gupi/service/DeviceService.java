package com.skywon.gupi.service;

import com.skywon.gupi.entity.Device;
import com.skywon.gupi.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    public List<Device> getAllDevice() {
        return this.deviceRepository.findAll();
    }

    public Device getDeviceById(int id) {
        return this.deviceRepository.findById(id).orElse(new Device());
    }

    public Device save(Device device) {
        return this.deviceRepository.save(device);
    }

    public Device updateDevice(Integer id, Device newDevice) throws Exception {
        Device device = this.deviceRepository.findById(id).orElseThrow(() -> new Exception("Appareil non trouvé"));

        if (newDevice.getName() != null && !newDevice.getName().trim().isEmpty()) {
            device.setName(newDevice.getName());
        }

        if (newDevice.getPrice() != null) {
            device.setPrice(newDevice.getPrice());
        }

        if (newDevice.getQr_code() != null && !newDevice.getQr_code().trim().isEmpty()) {
            device.setQr_code(newDevice.getQr_code());
        }

        if (newDevice.getUser() != null && newDevice.getUser().getId() != null) {
            device.setUser(newDevice.getUser());
        }
        return deviceRepository.save(device);


    }

    public void deleteDevice(Integer id) throws Exception {
        this.deviceRepository.deleteById(id);
    }

    public List<Device> getDevicesByUserId(Integer userId) {
        return deviceRepository.findByUserId(userId);
    }

    public Device unsetDevice(Integer id) throws Exception {
        Device device = this.deviceRepository.findById(id).orElseThrow(() -> new Exception("Appareil non trouvé"));

            device.setUser(null);
        return deviceRepository.save(device);


    }
}
