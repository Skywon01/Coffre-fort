package com.skywon.gupi.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

/**
 * Role des utilisateurs
 */
@Data
@Entity
@Table(name = "role")
public class Role implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * nom de lu role
     */
    private String name;

    /**
     * Returns the authority of this Role.
     * @return the authority of this Role
     */
    @Override
    public String getAuthority() {
        return this.name;
    }
}