import { Component, OnInit } from '@angular/core';
import { WebsocketService } from "../../services/websocket.service";
import { ChatService } from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [WebsocketService, ChatService]
})

export class ChatComponent implements OnInit {

  connection: WebSocket;
  url: string;
  messages: any;
  newMsg: string;
  
  constructor() {
    this.url = 'ws://127.0.0.1:1337';
    this.connection = new WebSocket(this.url);
    this.messages = [];
    this.newMsg = '';
  }

  ngOnInit(): void {
    this.connection.onopen = function () {
        console.log('WebSocket connected');
    }

    this.connection.onmessage =  (message) => {//arrow function
      //because standard function sees in 'this' websocket, not component
      //and can't fetch messages object
      var json;
      try {
        // console.log('Valid JSON: ', message.data);
        json = JSON.parse(message.data);
      } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ', message.data);
        return;
      };
      if (json.type === 'history') { // entire message history
        //insert every single message 
        for (var i=0; i < json.data.length; i++) {
          this.messages.push(json.data[i]);
        }
      };
      if (json.type === 'message') { // it's a single message
        this.messages.push(json.data);
      };
    }
}

  sendMsg(){
    var message = {
      author: "Angular Client",
      message: this.newMsg
    };

    this.connection.send(JSON.stringify(message));
    this.newMsg = '';
  }

} 
