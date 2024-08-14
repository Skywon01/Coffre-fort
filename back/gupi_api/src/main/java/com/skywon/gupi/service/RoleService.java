package com.skywon.gupi.service;

import com.skywon.gupi.entity.Role;
import com.skywon.gupi.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    /**
     * Ajouter un role
     *
     * @param nom du role
     * @return Le role
     */
    public Role save(String nom) {
        Role role = findByName(nom); // chercher dans la bd
        if (role != null) {
            return role;
        }
        role = new Role();
        role.setName(nom);
        return roleRepository.save(role);
    }

    /**
     * Rechercher le role à partir du nom
     *
     * @param nom du role
     * @return null si le role n'existe pas
     */
    public Role findByName(String nom) {
        return roleRepository.findByName(nom);
    }
}
