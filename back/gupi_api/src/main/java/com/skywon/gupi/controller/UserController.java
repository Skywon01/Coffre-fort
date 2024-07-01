package com.skywon.gupi.controller;

import com.skywon.gupi.entity.User;
import com.skywon.gupi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Récupérer tous les utilisateurs
     * C
     * @return
     */
    @GetMapping("api/user")
    public List<User> allUsers() {
        return this.userService.getAll();
    }

    @PostMapping("api/user")
    public User CreateUser(@RequestBody User user) {
        return this.userService.save(user);

    }

    @GetMapping("api/user/{id}")
    public User getUser(@PathVariable Integer id) {
        return this.userService.byId(id);
    }


    @PutMapping("api/user/{id}")
    public User updateUser(@PathVariable Integer id, @RequestBody User user) throws Exception {
        return this.userService.updateUser(id, user);
    }

    @DeleteMapping("api/user/{id}")
    public void deleteUser(@PathVariable Integer id) {
        this.userService.deleteById(id);
    }


}
