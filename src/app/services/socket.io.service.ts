import {Injectable} from '@angular/core';
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
    public userSubj = new Subject();

    constructor(private http: HttpClient) {
    }

    setupSocketConnection() {
        this.socket = io('http://localhost:1234', {query: {userName: localStorage.getItem('user')}});


        this.socket.on('disconnect', users => {
            this.userSubj.next(users);
        })

        this.socket.on('mmessage', mes => {
            this.mesSubj.next({message: mes});
        })
        this.socket.on('connect_error', () => {
            this.socketStatus.next(false);
        });

        this.socket.on('new user', users => {
            if (!Array.isArray(users)) {
                alert('error, not correct data')
            }
            this.userSubj.next(users);
        })

        this.socket.on('connect', users => {
            this.socketStatus.next(true);
        });
    }

    disconnect() {
        this.socket && this.socket.disconnect();
    }


    sendMsg(msg: Message) {
        this.socket.emit('mmessage', msg);
    }

    loadMessages() {
        return this.http.get('http://192.168.88.248:1234/chat/history')
    }
}
