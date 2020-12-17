import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { WebsocketService } from "./websocket.service";
import { map } from 'rxjs/operators';

const CHAT_URL = "ws://localhost:1337/";

export interface Message {
  type: string;
  date: Date;
  author: string;
  message: string;
}

@Injectable()
export class ChatService {
  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<Message>>wsService.connect(CHAT_URL).pipe(
      map(
        (response: MessageEvent): Message => {
          let data = JSON.parse(response.data);
          let type = data.type;
          return {
            type: data.type,
            date: new Date(data.data.time),
            author: data.data.author,
            message: data.data.message
          };
        }
      )
    );
  }
}