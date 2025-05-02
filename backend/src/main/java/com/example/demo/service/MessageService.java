package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.ChatMessageDTO;
import com.example.demo.entity.ChatThread;
import com.example.demo.entity.Message;
import com.example.demo.entity.MessageType;
import com.example.demo.entity.ThreadStatus;
import com.example.demo.entity.User;
import com.example.demo.repository.ChatThreadRepository;
import com.example.demo.repository.MessageRepository;
import com.example.demo.repository.UserRepository;

@Service
public class MessageService {

    private final MessageRepository msgRepo;
    private final UserRepository userRepo;
    private final ChatThreadRepository threadRepo;

    public MessageService(MessageRepository msgRepo,
                          UserRepository userRepo,
                          ChatThreadRepository threadRepo) {
        this.msgRepo = msgRepo;
        this.userRepo = userRepo;
        this.threadRepo = threadRepo;
    }

    // Méthode pour sauvegarder un message
    public Message saveMessage(ChatMessageDTO dto) {
        // Recherche des utilisateurs par leur ID
        User sender = userRepo.findById(dto.getSenderId())
                              .orElseThrow(() -> new IllegalArgumentException("Sender not found"));
        User receiver = userRepo.findById(dto.getReceiverId())
                                .orElseThrow(() -> new IllegalArgumentException("Receiver not found"));
    
        // Vérification et création du fil de discussion
        ChatThread thread;
        if (dto.getThreadId() != null) {
            thread = threadRepo.findById(dto.getThreadId())
                               .orElseThrow(() -> new IllegalArgumentException("Thread not found"));
        } else {
            thread = new ChatThread();
            thread.setUser(sender);
            thread.setStatus(ThreadStatus.OPEN);
            thread.setCreatedAt(LocalDateTime.now());
            thread = threadRepo.save(thread);
        }
    
        // Création du message
        Message msg = new Message();
        msg.setSender(sender);
        msg.setReceiver(receiver);
        msg.setThread(thread);
        msg.setContent(dto.getContent());
        msg.setTimestamp(LocalDateTime.now());
        msg.setType(MessageType.CHAT);
        msg.setSeen(false);
    
        return msgRepo.save(msg);
    }
    

    // Récupérer l'historique des messages pour un fil
    public List<Message> getHistory(Long threadId) {
        return msgRepo.findByThreadIdOrderByTimestampAsc(threadId);
    }
}
