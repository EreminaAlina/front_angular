import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Message} from "../interfaces/message.interface";
import {SocketIoService} from "../services/socket.io.service";
import {formatDate} from "@angular/common";
import {ScrollToBottomDirective} from "../directives/scroll-to-bottom.directive";

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
    messages: Message[] = [];
    text: string;
    socketStatus = false;
    userName: string;

    @ViewChild(ScrollToBottomDirective)
    scroll: ScrollToBottomDirective;

    constructor(private router: Router, private socketServ: SocketIoService) {
    }

    ngOnInit(): void {
        this.socketServ.setupSocketConnection();
        this.socketServ.loadMessages().subscribe((result: Message[]) => {
            this.messages = result;
            setTimeout(() => {
                this.scroll.scrollToBottom();
            }, 100);
        }, error => {
            console.log('cant get messages');
        });
        this.socketServ.mesSubj.subscribe((data: { message: Message }) => {
                this.messages.push(data['message']);
                setTimeout(() => {
                    this.scroll.scrollToBottom();
                }, 100);
            }
        )
        this.userName = localStorage.getItem('user');
        this.socketServ.socketStatus.subscribe((status: boolean) => {
            this.socketStatus = status;
        })
    }

    ngOnDestroy(): void {
        this.socketServ && this.socketServ.disconnect();
    }

    todos() {
        return this.router.navigate([''])
    }

    logOut() {
        localStorage.clear();
        return this.router.navigate(['/login'])
    }

    sendMessage() {
        const now = new Date();
        if(this.text.trim()){
            const msg = {
                userName: this.userName,
                message: this.text,
                time: formatDate(now, 'HH:mm', 'en_US', 'UTC+3')
            };
            this.messages.push(msg)
            this.socketServ.sendMsg(msg);
            this.text = '';
            setTimeout(() => {
                this.scroll.scrollToBottom();
            }, 100);
        }
    }

}

