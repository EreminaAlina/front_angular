import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {ToDo} from "../../interfaces/ToDo.interface";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
    tasks: ToDo[];
    faTrashAlt= faTrashAlt;

    constructor(private taskService: TaskService) {
    }

    ngOnInit(): void {
        this.taskService.showTodo();

        this.taskService.tasksSubj.subscribe((tasks: ToDo[]) => {
            this.tasks = tasks;
        });
    }

    checkTask(task){
       // task.checked = !task.checked;
        this.taskService.selectTask(task);
    }

    delTask(idx){
         this.taskService.deleteTask(idx);
    }

}
