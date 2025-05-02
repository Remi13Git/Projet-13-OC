package com.example.demo.dto;

public class ChatMessageDTO {
    private Long threadId;
    private Long senderId;
    private Long receiverId;
    private String content;

    public Long getThreadId() {
        return threadId;
    }
    public void setThreadId(Long threadId) {
        this.threadId = threadId;
    }

    public Long getSenderId() {
        return senderId;
    }
    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public Long getReceiverId() {
        return receiverId;
    }
    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }

    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
}
