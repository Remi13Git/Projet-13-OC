import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ChatComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isChatOpen = false;
  messages: { content: string; senderId: number }[] = [];
  newMessage: string = '';
  threadId: number | null = null;

  senderId: number = 1;
  receiverId: number = 2;

  private refreshInterval: any = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.senderId = params['senderId'] ? +params['senderId'] : 1;
      this.receiverId = params['receiverId'] ? +params['receiverId'] : 2;
    });
  }

  ngOnDestroy() {
    this.clearMessageInterval();
  }

  toggleChatWindow() {
    this.isChatOpen = !this.isChatOpen;

    if (this.isChatOpen) {
      const storedThreadId = localStorage.getItem('threadId');
      if (storedThreadId) {
        this.threadId = +storedThreadId;
        this.getMessages();
        this.startMessageInterval();
      }
    } else {
      this.clearMessageInterval();
    }
  }

  getMessages() {
    if (this.threadId !== null) {
      this.http
        .get<{
          id: number;
          sender: { id: number; firstName: string; lastName: string; };
          receiver: any;
          thread: any;
          content: string;
          timestamp: string;
        }[]>(
          `http://localhost:8080/api/threads/${this.threadId}/messages`
        )
        .subscribe(
          (response) => {
            console.log('RAW messages from API:', response);
            const sorted = response.sort(
              (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            );
            this.messages = sorted.map(msg => ({
              content: msg.content,
              senderId: msg.sender.id
            }));
          },
          (err) => console.error('Erreur getMessages:', err)
        );
    }
  }

  sendMessage(message: string) {
    if (!message.trim()) return;

    const doSend = () => {
      const payload = {
        senderId: this.senderId,
        receiverId: this.receiverId,
        threadId: this.threadId,
        content: message,
        type: 'CHAT'
      };
      this.http.post('http://localhost:8080/api/messages', payload).subscribe(
        () => {
          this.messages.push({ content: message, senderId: this.senderId });
        },
        (err) => console.error('Erreur sendMessage:', err)
      );
    };

    if (!this.threadId) {
      this.createThread().subscribe(
        (resp) => {
          this.threadId = resp.id;
          localStorage.setItem('threadId', this.threadId.toString());
          doSend();
          this.startMessageInterval();
        },
        (err) => console.error('Erreur createThread:', err)
      );
    } else {
      doSend();
    }
  }

  createThread() {
    return this.http.post<{ id: number }>(
      `http://localhost:8080/api/threads?userId=${this.senderId}`,
      {}
    );
  }

  private startMessageInterval() {
    this.clearMessageInterval();
    this.refreshInterval = setInterval(() => this.getMessages(), 2000);
  }

  private clearMessageInterval() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }
}
