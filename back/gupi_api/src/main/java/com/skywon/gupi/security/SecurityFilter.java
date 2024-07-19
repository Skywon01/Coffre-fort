package com.skywon.gupi.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.skywon.gupi.manager.JwtTokenManager;
import com.skywon.gupi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String urlRequest = request.getRequestURI();

        if (urlRequest.startsWith("/api/open/")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // Extraire le token du cookie
            Cookie[] cookies = request.getCookies();
            if (cookies != null) {
                Cookie jwtCookie = Arrays.stream(cookies)
                        .filter(cookie -> "jwt".equals(cookie.getName()))
                        .findFirst()
                        .orElse(null);

                if (jwtCookie != null) {
                    String token = jwtCookie.getValue();
                    token = JwtTokenManager.getUser(token);
                    UserDetails user = userService.findByToken(token);

                    if (user != null) {
                        // On le passe aux controllers grâce au context
                        Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            }
        } catch (Exception e) {
            logger.info("Trying parse token but failed");
        }

        filterChain.doFilter(request, response);
    }
}