package com.skywon.gupi.service;

import com.skywon.gupi.entity.User;
import com.skywon.gupi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {

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
    public User createUser(User user){
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
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

    public User findByEmail(String email){
        if (email == null) {
            return null;
        }
        return userRepository.findByEmail(email.toLowerCase().trim());
    }

    public User findByToken(String token){
        if (token == null) {
            return null;
        }
        return userRepository.findByToken(token);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return user;
    }
}
