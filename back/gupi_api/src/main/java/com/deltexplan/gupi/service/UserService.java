package com.deltexplan.gupi.service;

import com.deltexplan.gupi.entity.User;
import com.deltexplan.gupi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAll(){
        return  this.userRepository.findAll();
    }

    /**
     * Méthode pour sauvegarder un utilisateur
     * @param user
     * @return
     */
    public User save(User user){
        return this.userRepository.save(user);
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

    public void deleteById(Integer id) {
        this.userRepository.deleteById(id);
    }

    //Update à définir
    public User updateUser(Integer id, User newUser) throws Exception {
        User user = this.userRepository.findById(id).orElseThrow(() -> new Exception("Utilisateur non trouvé"));

        user.setName(newUser.getName());
        user.setFirstName(newUser.getFirstName());
        user.setAge(newUser.getAge());
        user.setEmail(newUser.getEmail());
        user.setAddress(newUser.getAddress());
        return userRepository.save(user);


    }
}
