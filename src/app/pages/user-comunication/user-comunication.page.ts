import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { NgxAgoraService, Stream, AgoraClient, ClientEvent, StreamEvent } from 'ngx-agora';
import { WebSocketService } from '../../services/webSocket.service';

@Component({
  selector: 'user-comunication-page',
  templateUrl: './user-comunication.page.html',
  styleUrls: ['./user-comunication.page.scss'],
})
export class UserComunicationPage implements OnInit {

  userToComunicate: User;
  onCall: boolean;
  localCallId = 'agora_local';
  remoteCalls: string[] = [];

  private client: AgoraClient;
  private localStream: Stream;
  private uid: number;

  constructor(private route: ActivatedRoute, private router: Router, public _webSocketService: WebSocketService,
    private _userService: UserService, private ngxAgoraService: NgxAgoraService) {
    window.scroll(0, 0);
    this.uid = Math.floor(Math.random() * 100);
    this.startCall();
    console.log('_webSocketService', this._webSocketService.communicationProposal);
  }

  startCall() {
    // Added in this step to initialize the local A/V stream
    this.onCall = true;
    this.localStream = this.ngxAgoraService.createStream({ streamID: 18, audio: true, video: true, screen: false });
    this.assignLocalStreamHandlers();
    this.initLocalStream();
  }

  finishCall() {
    this.onCall = false;
    // Added in this step to initialize the local A/V stream
    console.log('close call');
    this.localStream.close();
  }

  private assignLocalStreamHandlers(): void {
    this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
      console.log('accessAllowed');
    });

    // The user has denied access to the camera and mic.
    this.localStream.on(StreamEvent.MediaAccessDenied, () => {
      console.log('accessDenied');
    });
  }

  private initLocalStream(onSuccess?: () => any): void {
    this.localStream.init(
      () => {
        // The user has granted access to the camera and mic.
        this.localStream.play(this.localCallId);
        if (onSuccess) {
          onSuccess();
        }
      },
      err => console.error('getUserMedia failed', err)
    );
  }

  private assignClientHandlers(): void {
    this.client.on(ClientEvent.LocalStreamPublished, evt => {
      console.log('Publish local stream successfully');
    });

    this.client.on(ClientEvent.Error, error => {
      console.log('Got error msg:', error.reason);
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(
          '',
          () => console.log('Renewed the channel key successfully.'),
          renewError => console.error('Renew channel key failed: ', renewError)
        );
      }
    });

    this.client.on(ClientEvent.RemoteStreamAdded, evt => {
      const stream = evt.stream as Stream;
      this.client.subscribe(stream, { audio: true, video: true }, err => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);
      if (!this.remoteCalls.length) {
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.client.on(ClientEvent.PeerLeave, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }

  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userToComunicate = this._webSocketService.userToComunicate;
      if (!this.userToComunicate) {
        this.router.navigate(['/']);
      }
    });

    this.client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
    this.assignClientHandlers();
  }

  ngOnDestroy(): void {
    if (this.localStream) {
      this.localStream.close();
    }
  }

}
