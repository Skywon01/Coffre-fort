package com.skywon.gupi.repository;

import com.skywon.gupi.entity.UserNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserNotificationRepository extends JpaRepository<UserNotification, Integer> {

    List<UserNotification> findByUserId(Integer user_id);
}
