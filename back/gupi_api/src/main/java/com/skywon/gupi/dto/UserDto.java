package com.skywon.gupi.dto;

import com.skywon.gupi.entity.User;
import lombok.Data;

import java.util.Date;


@Data
public class UserDto {

    private String name;
    private String firstName;
    private String address;
    private String profile;
    private String email;
    private String password;
    private Integer age;


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
        user.setAge(age);
        user.setDateCreation(new Date());
        user.setActive(true);
        return user;
    }
}
