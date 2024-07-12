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
     * add or find a role
     *
     * @param  name du role
     * @return     Le role
     */
    public Role save(String name){
        Role role = findByName(name); // chercher dans la bd
        if(role != null){
            return role;
        }
        role = new Role();
        role.setName(name);
        return roleRepository.save(role);
    }

    /**
     * Rechercher le role à partir du nom
     * @param name du role
     * @return null si le role n'existe pas
     */
    public Role findByName(String name){
        return roleRepository.findByName(name);
    }
}
