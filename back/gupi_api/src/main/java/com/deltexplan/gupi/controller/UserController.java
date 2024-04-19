package com.deltexplan.gupi.controller;

import com.deltexplan.gupi.entity.User;
import com.deltexplan.gupi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Récupérer tous les utilisateurs
     * C
     * @return
     */
    @GetMapping("/user")
    public List<User> allUsers() {
        return this.userService.getAll();
    }

    @PostMapping("/user")
    public User CreateUser(@RequestBody User user) {
        return this.userService.save(user);

    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable Integer id) {
        return this.userService.byId(id);
    }

//    Putmapping à mettre en place

    @PutMapping("/user/{id}")
    public User updateUser(@PathVariable Integer id, @RequestBody User user) throws Exception {
        return this.userService.updateUser(id, user);
    }

    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable Integer id) {
        this.userService.deleteById(id);
    }


}
