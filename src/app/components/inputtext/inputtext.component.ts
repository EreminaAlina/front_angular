import {Component,  NgZone, ViewChild} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-inputtext',
    templateUrl: './inputtext.component.html',
    styleUrls: ['./inputtext.component.scss']
})
export class InputtextComponent {
    text:string;

    constructor(private taskService: TaskService, private _ngZone: NgZone) {
    }

    save() {
        if (this.text.length !== 0) {
            this.taskService.createTask(this.text);
            this.text = '';
        }
    }
    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this._ngZone.onStable.pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

}
