package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.ChatThread;
import com.example.demo.entity.Message;
import com.example.demo.service.ChatThreadService;
import com.example.demo.service.MessageService;

@RestController
@RequestMapping("/api/threads")
public class ThreadController {

    private final ChatThreadService threadService;
    private final MessageService messageService;

    public ThreadController(ChatThreadService threadService,
                            MessageService messageService) {
        this.threadService  = threadService;
        this.messageService = messageService;
    }

    // Créer un nouveau fil de discussion
    @PostMapping
    public ResponseEntity<ChatThread> createThread(@RequestParam Long userId) {
        ChatThread thread = threadService.createThread(userId);
        return ResponseEntity.ok(thread);
    }

    // Récupérer l'historique d'un fil
    @GetMapping("/{threadId}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable Long threadId) {
        List<Message> history = messageService.getHistory(threadId);
        return ResponseEntity.ok(history);
    }
}
