import { Component, OnInit } from '@angular/core';
import { Task } from './tasks';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  title?: string;
  deadline?: Date;
  retrievedData: any;
  tasks: Array<Task> = new Array<Task>();
  completed: boolean;
  public show = true;

  constructor(private tasksService: TasksService) {}

  addBtnClick() {
    if (this.title == null) {
      return;
    }
    let newTask: Task = new Task();
    newTask.title = this.title;
    newTask.deadline = this.deadline;
    newTask.completed = false;
    newTask.archived = false;
    this.tasksService.post(newTask).subscribe((response) => {
      console.log(response);
    });
    setTimeout(this.loadElements.bind(this, true), 50);
    this.title = null;
    this.deadline = null;
  }

  switchTaskChanged(event) {
    console.log(event);
    console.log(event.source.id);
    console.log(event.isChecked);
    console.log(typeof this.tasks[0].completed);
    // let task: Task = this.tasks.find(
    //   (task) => task.id === parseInt(event.source.id)
    // );
    // if (task.completed == true) {
    //   task.completed = false;
    // } else {
    //   task.completed = true;
    // }
    // this.tasksService.put(task);
    // setTimeout(this.loadElements.bind(this, true), 50);
  }

  archiveCompleted() {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].completed) {
        this.tasks[i].archived = true;
        this.tasksService.put(this.tasks[i]);
      }
    }
    setTimeout(this.loadElements.bind(this, true), 50);
  }

  // private switchTaskChanged(task: Task) {
  //   if (task.completed == true) {
  //     task.completed = false;
  //   } else {
  //     task.completed = true;
  //   }
  //   this.tasksService.put(task);
  //   setTimeout(this.loadElements.bind(this, true), 50);
  // }

  loadElementsOnSite() {
    this.show = false;
    setTimeout(() => (this.show = true));
  }

  loadElements(reload: boolean = false) {
    this.tasksService.get().subscribe((data) => {
      this.tasks = data;
    });
    if (reload == true) {
      this.loadElementsOnSite();
    }
  }

  ngOnInit() {
    this.loadElements();
  }
}
