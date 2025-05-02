import { Component, EventEmitter, Output, ElementRef, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  @Input() messages: string[] = [];
  newMessage: string = '';

  @Output() sendMessageEvent = new EventEmitter<string>();  // Utilisation de EventEmitter pour émettre l'événement
  @Output() close = new EventEmitter<void>();
  @ViewChild('chatBody') chatBody!: ElementRef;

  constructor(private appComponent: AppComponent) {}

  sendMessageToBackend() {
    if (this.newMessage.trim()) {
      this.sendMessageEvent.emit(this.newMessage);  // Émet vers AppComponent
      this.newMessage = '';
      setTimeout(() => this.scrollToBottom(), 0);
    }
  }
  

  closeChatWindow() {
    this.close.emit();  // Fermer la fenêtre de chat
  }

  scrollToBottom() {
    if (this.chatBody) {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    }
  }

  send() {
    this.sendMessageToBackend();
  }  
}
