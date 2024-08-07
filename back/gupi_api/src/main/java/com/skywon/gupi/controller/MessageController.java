package com.skywon.gupi.controller;

import com.skywon.gupi.dto.MessageDTO;
import com.skywon.gupi.entity.Message;
import com.skywon.gupi.entity.User;
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

    @GetMapping
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }
    @PostMapping
    public Message createMessage(@RequestBody MessageDTO messageDTO) {
        Message message = new Message();
        message.setContent(messageDTO.getContent());

        // Récupérer les entités User pour le sender et le recipient
        User sender = userRepository.findById(messageDTO.getSenderId()).orElseThrow(() -> new RuntimeException("Sender not found"));
        User recipient = userRepository.findById(messageDTO.getRecipientId()).orElseThrow(() -> new RuntimeException("Recipient not found"));

        message.setSenderId(sender);
        message.setRecipientId(recipient);
        message.setTimestamp(LocalDateTime.now());

        return messageService.createMessage(message);
    }

    @GetMapping("/between/{senderId}/{recipientId}")
    public List<Message> getMessagesBetweenUsers(@PathVariable Integer senderId, @PathVariable Integer recipientId) {
        return messageService.getMessagesBetweenUsers(senderId, recipientId);
    }
}