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

    /**
     * Récupère la liste de tous les appareils
     * @return
     */
    public List<Device> getAllDevice() {
        return this.deviceRepository.findAll();
    }

    /**
     * Récupère un appareil grâce à son id
     * @param id
     * @return
     */
    public Device getDeviceById(int id) {
        return this.deviceRepository.findById(id).orElse(new Device());
    }

    /**
     * Enregistre un appareil
     * @param device
     * @return
     */
    public Device save(Device device) {
        return this.deviceRepository.save(device);
    }

    /**
     * Met à jour un appareil
     * @param id
     * @param newDevice
     * @return
     * @throws Exception
     */
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

    /**
     * Supprime un appareil
     * @param id
     * @throws Exception
     */
    public void deleteDevice(Integer id) throws Exception {
        this.deviceRepository.deleteById(id);
    }

    /**
     * Récupère la liste des appareils attribués à un utilisateur
     * @param userId
     * @return
     */
    public List<Device> getDevicesByUserId(Integer userId) {
        return deviceRepository.findByUserId(userId);
    }

    /**
     * Désattribue un appareil à un utilisateur
     * @param id
     * @return
     * @throws Exception
     */
    public Device unsetDevice(Integer id) throws Exception {
        Device device = this.deviceRepository.findById(id).orElseThrow(() -> new Exception("Appareil non trouvé"));

            device.setUser(null);
        return deviceRepository.save(device);


    }
}
