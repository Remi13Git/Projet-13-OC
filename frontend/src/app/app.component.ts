import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ChatComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isChatOpen = false;
  messages: string[] = [];
  newMessage: string = '';
  threadId: number | null = null;

  constructor(private http: HttpClient) {}

  // Ouvre ou ferme la fenêtre de chat
  toggleChatWindow() {
    this.isChatOpen = !this.isChatOpen;

    if (this.isChatOpen) {
      // Vérifie si un threadId est déjà en localStorage
      const storedThreadId = localStorage.getItem('threadId');
      if (storedThreadId) {
        this.threadId = parseInt(storedThreadId, 10);
        this.getMessages(); // Charge les messages existants
      }
    }
  }

  // Récupère les messages du thread existant
  getMessages() {
    if (this.threadId !== null) {
      this.http.get<any[]>(`http://localhost:8080/api/threads/${this.threadId}/messages`).subscribe(
        (response) => {
          // Tri par ordre chronologique (timestamp croissant)
          const sortedMessages = response.sort((a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
  
          // Extraire uniquement le contenu des messages
          this.messages = sortedMessages.map(msg => msg.content);
        },
        (error) => {
          console.error('Erreur lors de la récupération des messages:', error);
        }
      );
    }
  }
  

  // Gère l'envoi d'un message
  sendMessage(message: string) {
    if (message.trim()) {
      if (!this.threadId) {
        this.createThread().subscribe(
          (response) => {
            this.threadId = response.id;
            localStorage.setItem('threadId', this.threadId.toString());
            this.sendMessageToBackend(message);
          },
          (error) => {
            console.error('Erreur lors de la création du thread:', error);
          }
        );
      } else {
        this.sendMessageToBackend(message);
      }
    }
  }

  // Envoie le message avec le threadId actuel
  sendMessageToBackend(message: string) {
    const payload = {
      senderId: 1,
      receiverId: 2,
      threadId: this.threadId,
      content: message,
      type: 'CHAT'
    };

    this.http.post('http://localhost:8080/api/messages', payload).subscribe(
      (response) => {
        this.messages.push(message);
        this.newMessage = '';
      },
      (error) => {
        console.error("Erreur lors de l'envoi du message:", error);
      }
    );
  }

  // Crée un nouveau thread si nécessaire
  createThread() {
    return this.http.post<{ id: number }>('http://localhost:8080/api/threads?userId=1', {});
  }
}
