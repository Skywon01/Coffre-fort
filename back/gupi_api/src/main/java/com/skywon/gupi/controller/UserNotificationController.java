package com.skywon.gupi.controller;

import com.skywon.gupi.entity.UserNotification;
import com.skywon.gupi.repository.UserNotificationRepository;
import com.skywon.gupi.service.UserNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class UserNotificationController {
    @Autowired
    private UserNotificationRepository userNotificationRepository;
    @Autowired
    private UserNotificationService userNotificationService;

    @GetMapping("/user/{userId}")
    public List<UserNotification> getNotificationsForUser(@PathVariable Integer userId) {
        return userNotificationRepository.findByUserId(userId);
    }

    @GetMapping("/active/count/{userId}")
    public long getActiveNotificationsCount(@PathVariable Integer userId) {
        return userNotificationService.getActiveNotificationsCount(userId);
    }

    @PostMapping("/markAsInactive/{userId}")
    public void markNotificationsAsInactive(@PathVariable Integer userId) {
        userNotificationService.markNotificationsAsInactive(userId);
    }
}
