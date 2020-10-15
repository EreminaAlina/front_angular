import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Subject} from "rxjs";
import {Message} from "../interfaces/message.interface";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  socket;

  public mesSubj = new Subject();
  public socketStatus = new Subject();

  constructor(private http: HttpClient) { }

  setupSocketConnection() {
    this.socket = io('http://localhost:1234');
    this.socket.on('mmessage', mes =>{
        this.mesSubj.next({message: mes});
    })
    this.socket.on('connect_error', () => {
      this.socketStatus.next(false);
    });
    this.socket.on('connect', () => {
      this.socketStatus.next(true);
    });
  }

  disconnect() {
    this.socket && this.socket.disconnect();
  }


  sendMsg(msg: Message) {
    this.socket.emit('mmessage', msg);
  }

  loadMessages(){
    return this.http.get('http://192.168.88.248:1234/chat/history')
  }
}
