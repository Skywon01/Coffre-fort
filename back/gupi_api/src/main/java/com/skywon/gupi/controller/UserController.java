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
    public User save(@RequestBody User user) {
        return this.userService.createUser(user);


    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Integer id, @RequestBody User user) throws Exception {
        return this.userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        this.userService.deleteById(id);
    }

    @GetMapping("/current")
    public ResponseEntity<User> getCurrentUser() {
        // Simule la récupération de l'utilisateur actuel
        // En pratique, utilise des informations d'authentification pour obtenir l'utilisateur actuel
        User currentUser = getCurrentAuthenticatedUser();
        return ResponseEntity.ok(currentUser);
    }

    private User getCurrentAuthenticatedUser() {
        // Retourne un utilisateur simulé
        User user = new User();
        user.setId(1);
        user.setFirstName("john_doe");
        user.setEmail("john.doe@example.com");
        return user;
    }
}
