package com.skywon.gupi.security;

import com.skywon.gupi.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

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
        // 403
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("api/**").permitAll()
                        .requestMatchers("/api/open/**").permitAll()
                        .requestMatchers("/api/client/**").hasAnyAuthority("CLIENT")
                        .requestMatchers("/api/dashboard/**").hasAnyAuthority("ADMIN")
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
        config.addAllowedHeader("Authorization");
        config.setAllowedMethods(Arrays.asList("GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        config.setAllowCredentials(true); // This is important since we are using session cookies
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}