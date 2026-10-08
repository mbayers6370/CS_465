import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Message, MessageKind } from '../models/message';
import { TripData } from '../services/trip-data';

type MessageFilter = 'all' | MessageKind;

@Component({
  selector: 'app-messages',
  imports: [CommonModule, DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class Messages implements OnInit {
  messages: Message[] = [];
  activeFilter: MessageFilter = 'all';
  errorMessage = '';

  constructor(private tripData: TripData) {}

  get filteredMessages(): Message[] {
    return this.activeFilter === 'all'
      ? this.messages
      : this.messages.filter((message) => message.kind === this.activeFilter);
  }

  filterLabel(kind: MessageKind): string {
    return kind === 'trip' ? 'Trip inquiry' : kind === 'room' ? 'Room inquiry' : 'General message';
  }

  setFilter(filter: MessageFilter): void {
    this.activeFilter = filter;
  }

  ngOnInit(): void {
    this.tripData.getMessages().subscribe({
      next: (messages) => this.messages = messages,
      error: (error) => this.errorMessage = error.error?.message ?? 'Unable to load messages.'
    });
  }
}
