package com.deltexplan.gupi.service;

import com.deltexplan.gupi.entity.Device;
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

    public Device updateDevice(Integer id, Device newDevice) throws Exception {
        Device device = this.deviceRepository.findById(id).orElseThrow(() -> new Exception("Appareil non trouvé"));

        device.setName(newDevice.getName());
        device.setPrice(newDevice.getPrice());
        device.setQr_code(newDevice.getQr_code());
        return deviceRepository.save(device);


    }

    public void deleteDevice(Integer id) throws Exception {
        this.deviceRepository.deleteById(id);
    }
}
