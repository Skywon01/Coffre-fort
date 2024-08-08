package com.skywon.gupi.controller;

import com.skywon.gupi.dto.MessageDTO;
import com.skywon.gupi.entity.Message;
import com.skywon.gupi.entity.User;
import com.skywon.gupi.repository.MessageRepository;
import com.skywon.gupi.repository.UserRepository;
import com.skywon.gupi.service.MessageService;
import com.skywon.gupi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageRepository messageRepository;

    @GetMapping
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }
    @PostMapping
    public Message createMessage(@RequestBody MessageDTO messageDTO) {
        Message message = new Message();
        message.setContent(messageDTO.getContent());

        // Récupérer les entités User pour le sender et le recipient
        User sender = userRepository.findById(messageDTO.getSenderId().getId()).orElseThrow(() -> new RuntimeException("Sender not found"));
        User recipient = userRepository.findById(messageDTO.getRecipientId().getId()).orElseThrow(() -> new RuntimeException("Recipient not found"));

        message.setSenderId(sender);
        message.setRecipientId(recipient);
        message.setTimestamp(LocalDateTime.now());

        return messageService.createMessage(message);
    }

    @GetMapping("/conversation/{userId1}/{userId2}")
    public List<Message> getMessagesBetweenUsers(@PathVariable Integer userId1, @PathVariable Integer userId2) {
        User user1 = userRepository.findById(userId1).orElseThrow(() -> new RuntimeException("User not found"));
        User user2 = userRepository.findById(userId2).orElseThrow(() -> new RuntimeException("User not found"));
        return messageRepository.findBySenderIdAndRecipientIdOrRecipientIdAndSenderId(user1, user2, user1, user2);
    }


}