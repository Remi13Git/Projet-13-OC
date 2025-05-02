import { Component, EventEmitter, Output, ElementRef, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  @Input() messages: { content: string; senderId: number }[] = [];
  @Input() currentUserId!: number;

  newMessage: string = '';
  @Output() sendMessageEvent = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();
  @ViewChild('chatBody') chatBody!: ElementRef;

  send() {
    if (!this.newMessage.trim()) return;
    this.sendMessageEvent.emit(this.newMessage);
    this.newMessage = '';
    setTimeout(() => this.scrollToBottom(), 0);
  }

  closeChatWindow() {
    this.close.emit();
  }

  scrollToBottom() {
    if (this.chatBody) {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    }
  }
}
