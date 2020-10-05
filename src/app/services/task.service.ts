import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ToDo} from "../interfaces/ToDo.interface";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    tasks: ToDo[] = [];
    i: number = 0;
    public tasksSubj = new Subject();
    public uncheckedSubj = new Subject();

    filterValue = 'all';

    constructor(private http: HttpClient) {
    }

    createTask(task) {
        let newTask: ToDo = {text: task, checked: false, index: this.i};
        newTask.user = localStorage.getItem('userId');
        this.http.post('http://localhost:1234/todo/tasks', newTask).subscribe((res: ToDo) => {
            this.tasks.push(res);
            this.sendTasks();
            this.sendUnchecked();
            this.i++;
        }, error => {

        });
    }


    deleteTask(i) {
        const task = this.tasks.find(task => task.index === i)
        this.tasks.splice(this.tasks.indexOf(task), 1);
        this.sendTasks();
        this.sendUnchecked();
        this.http.delete(`http://localhost:1234/todo/tasks/${task._id}`).subscribe();
    }

    selectTask(task) {
        this.sendUnchecked();
        const headers = new HttpHeaders({'Authorization': 'JWT token'});
        this.http.put('http://localhost:1234/todo/select/task', task, {headers})
            .subscribe();
    }

    sendUnchecked() {
        const uncheckedtasks = this.tasks.filter(task => !task.checked).length;
        this.uncheckedSubj.next(uncheckedtasks);
        this.sendTasks();
    }

    sendTasks() {
        let filteredTasks = [];
        switch (this.filterValue) {
            case 'all':
                filteredTasks = this.tasks;
                break;
            case 'todo':
                filteredTasks = this.tasks.filter(task => !task.checked);
                break;
            case 'completed':
                filteredTasks = this.tasks.filter(task => task.checked);
                break;
        }
        this.tasksSubj.next(filteredTasks);
    }

    deleteComp() {
        let user = localStorage.getItem('userId');
        const params = new HttpParams().append('usrId', user);
        this.tasks = this.tasks.filter(task => !task.checked);
        this.http.delete('http://localhost:1234/todo/delete', {params}).subscribe();
        this.sendTasks();
    }

    selectAll() {
        let user = localStorage.getItem('userId');
        const uncheckedtasks = this.tasks.filter(task => !task.checked).length;
        let allCh = uncheckedtasks !== 0;
        this.tasks.forEach(task => task.checked = allCh);
        this.http.put('http://localhost:1234/todo/select/tasks', {userId: user, allCheck: allCh}).subscribe();
        this.sendTasks();
        this.sendUnchecked();
    }

    showSelected(value: string) {
        this.filterValue = value;
        this.sendTasks();
    }

    showTodo() {
        let user = localStorage.getItem('userId');
        const params = new HttpParams().append('userId', user);
        this.http.get('http://localhost:1234/todo/tasks', {params})
            .subscribe((result) => {
                this.tasks = result as ToDo[];
                this.sendTasks();
                this.sendUnchecked();
            }, (err) => {

            });
    }
}