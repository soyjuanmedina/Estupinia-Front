import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AppComponent } from '../app.component';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { CommunicationProposal } from '../interfaces/communicationProposal';
import { Router } from '@angular/router';
declare let $: any;


@Injectable({
  providedIn: 'root'
})

export class WebSocketService {
  webSocketEndPoint: string = 'http://localhost:8080/ws';
  topic: string = "/user/queue/reply";
  stompClient: any;
  communicationProposal: CommunicationProposal

  constructor(private _userService: UserService, public router: Router) { }

  _connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({ 'username': this._userService.user.email }, function (frame) {
      _this.stompClient.subscribe(_this.topic, function (communicationProposal: CommunicationProposal) {
        _this.communicationProposalReceived(communicationProposal);
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

  sendCommunicationProposal(communicationProposal) {
    this.stompClient.send("/app/communicationproposal", {}, JSON.stringify(communicationProposal));
  }

  communicationProposalReceived(communicationProposal) {
    this.communicationProposal = JSON.parse(communicationProposal.body);
    if (this.communicationProposal.type == "question") {
      $('#communicationProposalReceivedModal').modal('show');
    } else {
      $('#conectingModal').modal('hide');
      if (this.communicationProposal.answer == "no") {
        $('#communicationProposalReceivedModal').modal('show');
      } else {
        this.router.navigate(['/usertocomunicate', this.communicationProposal.to.id]);
      }
    }
  }

  answerProposal(answer) {
    this.communicationProposal.answer = answer;
    this.communicationProposal.type = "answer";
    this.stompClient.send("/app/communicationproposal", {}, JSON.stringify(this.communicationProposal));
  }

}