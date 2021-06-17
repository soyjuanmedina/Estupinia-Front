import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AppComponent } from '../app.component';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})

export class WebSocketService{
  webSocketEndPoint: string = 'http://localhost:8080/ws';
  topic: string = "/topic/greetings";
  stompClient: any;

  constructor( private _userService: UserService) { }

  _connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({'username': this._userService.user.email}, function (frame) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
        console.log("Hemos recibido algo")
        _this.onMessageReceived(sdkEvent);
      });
      //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message 
   */
  _send(message) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/hello", {}, JSON.stringify(message));
  }

  getConnected() {
    console.log("getConnected");
    this.stompClient.send("/app/users", {}, JSON.stringify("Estamos conectando"));
  }

  onMessageReceived(message) {
    console.log("Message Recieved from Server:" + message);
    // this.appComponent.handleMessage(JSON.stringify(message.body));
  }
}