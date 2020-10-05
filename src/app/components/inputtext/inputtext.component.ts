import {Component} from '@angular/core';
import {TaskService} from "../../services/task.service";

@Component({
    selector: 'app-inputtext',
    templateUrl: './inputtext.component.html',
    styleUrls: ['./inputtext.component.css']
})
export class InputtextComponent {
    text:string;

    constructor(private taskService: TaskService) {
    }

    save() {
        if (this.text.length !== 0) {
            this.taskService.createTask(this.text);
            this.text = '';
        }
    }

}
