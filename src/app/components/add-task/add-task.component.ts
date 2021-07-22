import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  text!: string;
  datetime!: string;
  reminder: boolean = false;

  showAddTask!: boolean;
  subscription!: Subscription;

  constructor(private uiService:UiService) { 
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.text) {
      alert("Task required");
      return;
    }

    const addTask = {
      text: this.text,
      day: this.datetime,
      reminder: this.reminder
    }

    this.onAddTask.emit(addTask);

    this.text = "";
    this.datetime = "";
    this.reminder = false;

  }

}
