import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";

@Component({
    selector: 'app-complete',
    templateUrl: './complete.component.html',
    styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {
    items: number = 0;
    value: string;

    constructor(private taskService: TaskService) {
    }

    ngOnInit(): void {
        this.taskService.uncheckedSubj.subscribe((unckecked: number) => {
            this.items = unckecked;
        });
    }

    clearCompleted() {
        this.taskService.deleteComp();
    }

    ctrlA() {

        this.taskService.selectAll();
    }

    filterTasks(value) {
        this.taskService.showSelected(value);
    }
}
