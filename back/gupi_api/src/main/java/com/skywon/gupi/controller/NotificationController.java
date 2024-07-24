package com.skywon.gupi.controller;

import com.skywon.gupi.entity.UserNotification;
import com.skywon.gupi.repository.UserNotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired
    private UserNotificationRepository userNotificationRepository;

    @GetMapping("/user/{userId}")
    public List<UserNotification> getNotificationsForUser(@PathVariable Integer userId) {
        return userNotificationRepository.findByUserId(userId);
    }
}
