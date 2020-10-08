import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit
} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {ToDo} from "../../interfaces/ToDo.interface";
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import Timeout = NodeJS.Timeout;



const dateFormat = require('dateformat');

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy, AfterViewInit {
    tasks: ToDo[];
    faTrashAlt = faTrashAlt;
    time: Date;
    interval: Timeout;

    constructor(private taskService: TaskService) {
    }

    ngOnInit(): void {
        console.log('ngOnInit');
        this.taskService.showTodo();
        this.taskService.tasksSubj.subscribe((tasks: ToDo[]) => {
            this.tasks = tasks;
        });
    }

    ngAfterViewInit(): void {
        console.log('ngAfterViewInit');
        this.interval = setInterval(() => {
            this.checkTime()
        }, 1000)


    }

    ngOnDestroy(): void {
        console.log('ngOnDestroy');
        clearInterval(this.interval);
    }

    checkTask(task) {
        this.taskService.selectTask(task);
    }

    delTask(idx) {
        this.taskService.deleteTask(idx);
    }

    checkTime() {
        const now = new Date();
        this.tasks.forEach(task => {
            task.estimated = task.taskTime && Date.parse(task.taskTime.toString()) < Date.parse(dateFormat(now));
        })
    }

    setTime(task, e){
        console.log(e.value);
        console.log(typeof e.value);
        this.taskService.setTime(task);
    }
}
