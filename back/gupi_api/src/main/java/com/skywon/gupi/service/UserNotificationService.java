package com.skywon.gupi.service;

import com.skywon.gupi.entity.UserNotification;
import com.skywon.gupi.repository.UserNotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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
        notification.setActive(true);
        // A vérifier pour pouvoir mettre le nom de l'expéditeur
//        notification.setUser(userId);

        userNotificationRepository.save(notification);
    }

    public List<UserNotification> getActiveNotifications(Integer userId) {
        return userNotificationRepository.findByUserIdAndActiveTrue(userId);
    }

    public long getActiveNotificationsCount(Integer userId) {
        return userNotificationRepository.countByUserIdAndActiveTrue(userId);
    }

    public void markNotificationsAsInactive(Integer userId) {
        List<UserNotification> notifications = userNotificationRepository.findByUserIdAndActiveTrue(userId);
        notifications.forEach(notification -> notification.setActive(false));
        userNotificationRepository.saveAll(notifications);
    }

}
