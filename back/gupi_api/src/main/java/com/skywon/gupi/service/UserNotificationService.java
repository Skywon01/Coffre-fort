package com.skywon.gupi.service;

import com.skywon.gupi.entity.UserNotification;
import com.skywon.gupi.repository.UserNotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserNotificationService {
    @Autowired
    private UserNotificationRepository userNotificationRepository;

    public void createNotification(String senderName, String senderFirstName, String fileName, Integer userId) {
        UserNotification notification = new UserNotification();
        notification.setSenderName(senderName);
        notification.setSenderFirstName(senderFirstName);
        notification.setFileName(fileName);
        notification.setTimestamp(LocalDateTime.now());
        // Assuming user entity is already fetched and set, else you can fetch user by userId from UserRepository
        // notification.setUser(user);

        userNotificationRepository.save(notification);
    }

}
