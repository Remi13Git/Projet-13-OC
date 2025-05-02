package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entity.ChatThread;
import com.example.demo.entity.ThreadStatus;
import com.example.demo.entity.User;
import com.example.demo.repository.ChatThreadRepository;
import com.example.demo.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class ChatThreadService {

    private final ChatThreadRepository threadRepo;
    private final UserRepository userRepo;

    public ChatThreadService(ChatThreadRepository threadRepo, UserRepository userRepo) {
        this.threadRepo = threadRepo;
        this.userRepo = userRepo;
    }

    @Transactional
    public ChatThread createThread(Long userId) {
        User user = userRepo.findById(userId)
                            .orElseThrow(() -> new IllegalArgumentException("Utilisateur introuvable"));
        
        // Créer le thread et définir son statut à "OPEN"
        ChatThread thread = new ChatThread();
        thread.setUser(user);
        thread.setStatus(ThreadStatus.OPEN); 
        thread.setCreatedAt(LocalDateTime.now());

        // Sauvegarde le thread dans la base de données
        ChatThread savedThread = threadRepo.save(thread);

        // Forcer l'enregistrement des données dans la base de données
        threadRepo.flush();

        return savedThread;
    }


    public Optional<ChatThread> getThread(Long threadId) {
        return threadRepo.findById(threadId);
    }
}

