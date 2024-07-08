package com.skywon.gupi.service;

import com.skywon.gupi.entity.User;
import com.skywon.gupi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAll() {
        return this.userRepository.findAll();
    }

    /**
     * Méthode pour rechercher un utilisateur par son id
     *
     * @param id
     * @return
     */
    public User byId(Integer id) {
        return this.userRepository.findById(id).orElse(new User());
    }


    /**
     * Méthode pour sauvegarder un utilisateur
     * @param user
     * @return
     */
    public User save(User user){
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        return this.userRepository.save(user);
    }


    public void deleteById(Integer id) {
        this.userRepository.deleteById(id);
    }

    //Fonctionnel mais refactor à prévoir
    public User updateUser(Integer id, User newUser) throws Exception {
        User user = this.userRepository.findById(id).orElseThrow(() -> new Exception("Utilisateur non trouvé"));

        user.setName(newUser.getName());
        user.setFirstName(newUser.getFirstName());
        user.setAge(newUser.getAge());
        user.setEmail(newUser.getEmail());
        user.setAddress(newUser.getAddress());
        user.setPassword(newUser.getPassword());
        return userRepository.save(user);


    }
}
