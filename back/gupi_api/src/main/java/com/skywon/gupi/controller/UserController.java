package com.skywon.gupi.controller;

import com.skywon.gupi.entity.User;
import com.skywon.gupi.repository.UserRepository;
import com.skywon.gupi.service.EmailService;
import com.skywon.gupi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static com.skywon.gupi.manager.JwtTokenManager.generateToken;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    /**
     * Récupérer tous les utilisateurs
     *
     * @return
     */
    @GetMapping("")
    public List<User> allUsers() {
        return this.userService.getAll();
    }

    /**
     * Récupérer un seul utilisateur
     *
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
     *
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
     *
     * @param id
     */
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        if (userRepository.existsById(id)) {
            this.userService.deleteById(id);

        } else throw new RuntimeException("User not found");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            User user = userService.findByEmail(email);
            if (user != null) {
                sendResetEmail(user);
            }
        } catch (Exception ignored) {

        }
        return ResponseEntity.ok("Email envoyé.");
    }

    public void sendResetEmail(User user) {
        String resetToken = generateToken();
        user.setResetToken(resetToken);
        user.setTokenExpiration(LocalDateTime.now().plusMinutes(15));  // Expire après 15 minutes
        userRepository.save(user);
        String resetUrl = "http://localhost:4200/api/users/reset-password?resetToken=" + user.getResetToken();
        emailService.sendEmail(user.getEmail(), "Réinitialisation du mot de passe", "Cliquez sur le lien pour réinitialiser votre mot de passe: " + resetUrl);
    }

    private String generateToken() {
        return UUID.randomUUID().toString();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String resetToken, @RequestBody Map<String, String> request) {
        try {
            userService.resetPassword(resetToken, request.get("newPassword"));
            return ResponseEntity.ok("Mot de passe réinitialisé avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}