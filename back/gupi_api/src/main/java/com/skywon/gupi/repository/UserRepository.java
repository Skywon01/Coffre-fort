package com.skywon.gupi.repository;

import com.skywon.gupi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);

    User findByToken(String token);

    User findByResetToken(String resetToken);
}
