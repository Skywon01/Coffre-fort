package com.skywon.gupi.controller;

import com.skywon.gupi.entity.User;
import com.skywon.gupi.repository.UserRepository;
import com.skywon.gupi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    /**
     * Récupérer tous les utilisateurs
     * C
     * @return
     */
    @GetMapping("/")
    public List<User> allUsers() {
        return this.userService.getAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Integer id) {
        return this.userService.byId(id);
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<User> CreateUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);

    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Integer id, @RequestBody User user) throws Exception {
        return this.userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        this.userService.deleteById(id);
    }


}
