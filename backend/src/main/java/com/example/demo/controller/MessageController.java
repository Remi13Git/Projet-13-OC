package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ChatMessageDTO;
import com.example.demo.entity.Message;
import com.example.demo.service.MessageService;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    // Créer un message
    @PostMapping
    public ResponseEntity<Message> createMessage(@RequestBody ChatMessageDTO dto) {
        // Appel du service pour sauvegarder le message
        Message createdMessage = messageService.saveMessage(dto);
        return ResponseEntity.ok(createdMessage); // Retourner le message créé
    }
}
