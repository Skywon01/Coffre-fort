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

    public List<UserNotification> getActiveNotifications(Integer userId) {
        return userNotificationRepository.findByUserIdAndActiveTrue(userId);
    }

    /**
     * Méthode pour compter les notifications
     * @param userId
     * @return
     */
    public long getActiveNotificationsCount(Integer userId) {
        return userNotificationRepository.countByUserIdAndActiveTrue(userId);
    }

    /**
     * Méthode utilisée pour désactiver les notifications
     * @param userId
     */
    public void markNotificationsAsInactive(Integer userId) {
        List<UserNotification> notifications = userNotificationRepository.findByUserIdAndActiveTrue(userId);
        notifications.forEach(notification -> notification.setActive(false));
        userNotificationRepository.saveAll(notifications);
    }

}
