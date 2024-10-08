package com.gupi;

import com.skywon.gupi.security.SecurityFilter;
import com.skywon.gupi.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@Profile("test")
public class SecurityConfigTest {

    @Bean
    public SecurityFilter securityFilter(){
        return new SecurityFilter();
    }

    @Bean
    public UserService userService(){
        return new UserService();
    }


    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userService()); // récupérer le user associer a l'email
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder()); // vérifier le mdp
        return daoAuthenticationProvider;
    }

    @Bean
    public SecurityFilterChain apiSecurity(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/login").permitAll()
                        .requestMatchers("/api/**").permitAll()
                        .requestMatchers("/api/register").hasAuthority("ADMIN")
                        .requestMatchers("/api/file/upload-to-user-folder/").hasAuthority("ADMIN")
                        .requestMatchers("/api/**").hasAnyAuthority("ADMIN", "USER")
                        .anyRequest().permitAll()
                )
                .cors(Customizer.withDefaults())
                .addFilterBefore(securityFilter(), UsernamePasswordAuthenticationFilter.class)
                .build();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedHeader("X-XSRF-TOKEN");
        config.addAllowedHeader("Content-Type");
        config.addAllowedHeader("Content-Disposition");
        config.addAllowedHeader("Authorization");
        config.setAllowedMethods(Arrays.asList("GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"));
        config.addAllowedOrigin("http://localhost:4200");
        config.addAllowedOrigin("https://skywon01.github.io");
        config.setAllowCredentials(true); // This is important since we are using session cookies
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
