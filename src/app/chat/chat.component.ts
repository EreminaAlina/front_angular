import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Message} from "../interfaces/message.interface";
import {SocketIoService} from "../services/socket.io.service";
import {formatDate} from "@angular/common";
import {ScrollToBottomDirective} from "../directives/scroll-to-bottom.directive";
import {faCheck} from '@fortawesome/free-solid-svg-icons';


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
    online = [];
    readMes = false;
    faCheck = faCheck;


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
            this.messages.forEach(item =>{
                item.mstatus = true;
            })
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

        this.socketServ.userSubj.subscribe((users: []) => {
            this.online = users;
            console.log(this.online);
        })
    }

    ngOnDestroy(): void {
        this.socketServ && this.socketServ.disconnect();
    }

    todos() {
        this.socketServ && this.socketServ.disconnect();
        return this.router.navigate([''])
    }

    logOut() {
        localStorage.clear();
        this.socketServ && this.socketServ.disconnect();
        return this.router.navigate(['/login'])
    }

    sendMessage() {
        const now = new Date();
        let count =0;
        this.online.forEach(item =>{
            item.status? count++ : count;
        })
        count>=2? this.readMes = true: this.readMes = false;

        if (this.text.trim()) {
            const msg = {
                userName: this.userName,
                message: this.text,
                time: formatDate(now, 'HH:mm', 'en_US', 'UTC+3'),
                mstatus: this.readMes,
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

