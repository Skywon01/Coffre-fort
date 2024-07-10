package com.skywon.gupi.dto;

import com.skywon.gupi.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {

    private String name;

    private String firstName;

    private String address;

    private String email;

    private String password;

    private String profile;

    private boolean active;


    /**
     * Convert
     * @return
     */
    public User getUser(){
        User user = new User();
        user.setName(name);
        user.setFirstName(firstName);
        user.setAddress(address);
        user.setEmail(email);
        user.setPassword(password);
        user.setProfile(profile);
        user.setActive(active);
        return user;
    }
}
