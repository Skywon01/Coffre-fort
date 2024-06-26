package com.skywon.gupi.service;

import com.skywon.gupi.entity.Message;
import com.skywon.gupi.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Message createMessage(Message message) {
        message.setTimestamp(LocalDateTime.now());
        return messageRepository.save(message);
    }
}
