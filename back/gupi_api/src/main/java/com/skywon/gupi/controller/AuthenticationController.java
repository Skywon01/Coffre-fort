package com.skywon.gupi.controller;

import com.skywon.gupi.dto.AuthenticationDto;
import com.skywon.gupi.dto.UserDto;
import com.skywon.gupi.entity.User;
import com.skywon.gupi.manager.Aleatoire;
import com.skywon.gupi.manager.JwtTokenManager;
import com.skywon.gupi.manager.WsException;
import com.skywon.gupi.service.RoleService;
import com.skywon.gupi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/open")
public class AuthenticationController {
    @Autowired
    private UserService usersService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    /**
     * La méthode elle permet de récupérer l'email et le mdp de l'utilisateur
     * @return
     * <ul>
     *     <li><b>Exception</b> si l'email ou mdp n'existe pas</li>
     *     <li><b>token</b> si l'email et le mdp existent</li>
     * </ul>
     */
    @PostMapping("/login")
    public Map<String, String> identification(@RequestBody AuthenticationDto authenticationDto) throws WsException {

        String msgError = "L'email ou le mot de passe est incorrect";

        // vérifier si l'email existe
        User user = usersService.findByEmail(authenticationDto.getEmail());
        if (user == null) {
            throw new WsException(HttpStatus.NOT_FOUND,msgError);
        }

        // vérifier si le mdp correspond
        if (!this.bCryptPasswordEncoder.matches(authenticationDto.getPassword(), user.getPassword())) {
            throw new WsException(HttpStatus.NOT_FOUND,msgError);
        }

        // Crypter le token
        return Map.of("token", JwtTokenManager.generateToken(user.getToken()));
    }

    /**
     * La méthode qui permet d'enregister un nouvel utilisateur
     * @param userDto
     * @return
     * <ul>
     *     <li><b>Exception</b> si l'email existe ....</li>
     *     <li><b>token</b> si l'utilisateur et bien enregister</li>
     * </ul>
     */
    @PostMapping("/register")
    public Map<String, String> register(@RequestBody UserDto userDto) {
        if (userDto.getPassword().length() <= 4){
            throw new WsException(HttpStatus.BAD_REQUEST, "Le mot de passe doit contenir au moins 8 caractères");
        }

        User user = usersService.findByEmail(userDto.getEmail());
        if (user != null) {
            throw new WsException(HttpStatus.BAD_REQUEST, "Cet email existe déja");
        }

        user = userDto.getUser();
        user.setPassword(this.bCryptPasswordEncoder.encode(userDto.getPassword()));
        user.setRoles(List.of(roleService.save("USER")));

        // générer un token user
        do {
            user.setToken(Aleatoire.getRandomStr(50));
        }while (usersService.findByToken(user.getToken()) != null);


        usersService.createUser(user);

        return Map.of("token", JwtTokenManager.generateToken(user.getToken()));

    }
}
