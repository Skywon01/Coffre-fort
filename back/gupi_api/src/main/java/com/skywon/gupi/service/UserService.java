package com.skywon.gupi.service;

import com.skywon.gupi.entity.User;
import com.skywon.gupi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

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

    public User save(User user){
        return userRepository.save(user);
    }

    public User createUser(User user) throws Exception {
        String password = user.getPassword();
        String passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";

        if (!password.matches(passwordRegex)) {
            throw new Exception("Le mot de passe ne respecte pas les règles de sécurité.");
        }
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        return this.userRepository.save(user);
    }

    /**
     * Supprimer un utilisateur
     * @param id
     */
    public void deleteById(Integer id) {
        this.userRepository.deleteById(id);
    }


    /**
     * Méthode qui permet de mettre à jour le profil
     * On met des conditions pour n'envoyer que les informations mises à jour dans le formulaire
     * Le mot de passe peut être mis à jour de cette façon mais il sera conseillé de passer par un token
     * @param id
     * @param newUser
     * @return
     * @throws Exception
     */
    public User updateUser(Integer id, User newUser) throws Exception {
        User user = this.userRepository.findById(id).orElseThrow(() -> new Exception("Utilisateur non trouvé"));

        if (newUser.getName() != null && !newUser.getName().isEmpty()) {
            user.setName(newUser.getName());
        }
        if (newUser.getFirstName() != null && !newUser.getFirstName().isEmpty()) {
            user.setFirstName(newUser.getFirstName());
        }
        if (newUser.getAge() != null) {
            user.setAge(newUser.getAge());
        }
        if (newUser.getEmail() != null && !newUser.getEmail().isEmpty()) {
            user.setEmail(newUser.getEmail());
        }
        if (newUser.getAddress() != null && !newUser.getAddress().isEmpty()) {
            user.setAddress(newUser.getAddress());
        }
        if (newUser.getCompany() != null && !newUser.getCompany().isEmpty()) {
            user.setCompany(newUser.getCompany());
        }
        if (newUser.getJob() != null && !newUser.getJob().isEmpty()) {
            user.setJob(newUser.getJob());
        }
        if (newUser.getPassword() != null && !newUser.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(newUser.getPassword()));
        }
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

    public void resetPassword(String token, String newPassword) throws Exception {
        User user = userRepository.findByResetToken(token);
        if (user == null || user.getTokenExpiration().isBefore(LocalDateTime.now())) {
            throw new Exception("Token invalide ou expiré");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setTokenExpiration(null);
        userRepository.save(user);
    }

    public User updateProfileImage(Integer id, MultipartFile file) throws Exception {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new Exception("Utilisateur non trouvé"));

        String imagePath = saveImage(file);  // Sauvegarde l'image et récupère son chemin
        user.setProfile(imagePath);

        return userRepository.save(user);
    }

    private String saveImage(MultipartFile file) throws IOException {
        String uploadDir = "../../uploads/profile_pictures/";
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);

        Files.createDirectories(filePath.getParent());
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return filePath.toString();  // Retourne le chemin complet de l'image
    }
}
