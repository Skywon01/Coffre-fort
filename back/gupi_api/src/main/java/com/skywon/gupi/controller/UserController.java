package com.skywon.gupi.controller;

import com.skywon.gupi.entity.User;
import com.skywon.gupi.repository.UserRepository;
import com.skywon.gupi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
     * @return
     */
    @GetMapping("")
    public List<User> allUsers() {
        return this.userService.getAll();
    }

    /**
     * Récupérer un seul utilisateur
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public User getUser(@PathVariable Integer id) {
        return this.userService.byId(id);
    }

    /**
     * Enregistrer un utilisateur,
     * on passe par la méthode createUser de UserService
     * @param user
     * @return
     */
    @PostMapping(consumes = "application/json", produces = "application/json")
    public User save(@RequestBody User user) {
        return this.userService.createUser(user);


    }

    /**
     * Mise à jour de l'utilisateur
     *
     * @param id
     * @param user
     * @return
     * @throws Exception
     */
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Integer id, @RequestBody User user) throws Exception {
        return this.userService.updateUser(id, user);
    }

    /**
     * Suppression de l'utilisateur
     * @param id
     */
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        if (userRepository.existsById(id)) {
            this.userService.deleteById(id);

        }else throw new RuntimeException("User not found");
    }


}