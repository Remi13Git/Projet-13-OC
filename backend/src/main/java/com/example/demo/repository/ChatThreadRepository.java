package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ChatThread;

public interface ChatThreadRepository extends JpaRepository<ChatThread, Long> {
}
