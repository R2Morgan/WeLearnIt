import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = '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';

  constructor(private http: HttpClient) { }

  sendMessage(message: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    };

    return this.http.post(this.apiUrl, requestBody, { headers });
  }
}
